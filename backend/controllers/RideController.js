const { validationResult } = require('express-validator')
const rideService=require('../services/rideServices')

module.exports.createRide=async(req,res)=>{
    const errors=validationResult(req);

    // console.log('Incoming Token:', req.token);
    // console.log(req.user)


    const userId = req.user?.id;
    console.log(userId)
if (!userId) {
    console.log("User not found in request"); // helpful debug
    return res.status(401).json({ message: 'Unauthorized user' });
}




    

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {pickup,destination,vehicleType}=req.body;


    try{
        const ride=await rideService.createRide({user:req.user.id,pickup,destination,vehicleType})
        return res.status(201).json(ride)
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }


}