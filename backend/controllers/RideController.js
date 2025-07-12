const { validationResult } = require('express-validator')
const rideService=require('../services/rideServices')
const mapService=require('../services/mapsServices')
const {sendMessageToSocketId}=require('../socket')
const rideModel = require('../models/rideModel')

module.exports.createRide=async(req,res)=>{
    const errors=validationResult(req);

    // console.log('Incoming Token:', req.token);
    // console.log(req.user)


    const userId = req.user?.id;

if (!userId) {
   
    return res.status(401).json({ message: 'Unauthorized user' });
}




    

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {pickup,destination,vehicleType}=req.body;


    try{
        const ride=await rideService.createRide({user:req.user.id,pickup,destination,vehicleType})
        
        // ✅ REMOVED: First response that was causing issues
        // res.status(201).json(ride)

        const pickupCoordinates=await mapService.getAddressCoordinate(pickup)

        console.log(pickupCoordinates)

        const captainsInRadius=await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd,pickupCoordinates.lng,2)

        ride.otp=""

        const rideWithUser=await rideModel.findOne({_id:ride._id}).populate('user')

        captainsInRadius.map(captain=>{
            sendMessageToSocketId(captain.socketId,{
                event:'new-ride',
                data:rideWithUser
            })

        })
        
        // ✅ KEEP: Only this response should be sent
        res.status(201).json(ride);

       



    }
    catch(err){
        return res.status(500).json({message:err.message})
    }


}

module.exports.getFare=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {pickup,destination}=req.query;

    try{
        const fare=await rideService.getFare(pickup,destination);
        return res.status(200).json(fare);
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}


module.exports.confirmRide=async(req,res)=>{

    console.log(req.body.rideId,req.body.captainId);
    // console.log("confirm ride hai ki nahi lets check her e")

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const rideId=req.body.rideId;
    
    try{

        const ride=await rideService.confirmRide( rideId,req.body.captainId);

        console.log(ride,"Ride printing")
        console.log(`🎯 Ride confirmed. User socket ID: ${ride.user.socketId}`)

        

        sendMessageToSocketId(ride.user.socketId,
            
            {
            
            event:'ride-confirm',
            data:ride

        })


        return res.status(200).json(ride);
    }catch(err){
        console.log("Try catch mein error hai re baba")
        return res.status(500).json({message:err.message})
    }
}
