const rideModel=require('../models/rideModel')
const mapsService=require('../services/mapsServices')
const crypto=require('crypto')
const { sendMessageToSocketId } = require('../socket')




async function getFare(pickup,destination){

    if(!pickup || !destination){
        throw new Error('Pickup and destination are required')
    }
    
    const distanceTime=await mapsService.getDistanceTime(pickup,destination)
    console.log(distanceTime)

    const baseFare={
        auto:30,
        car:50,
        motorcycle:20
    }
    const perKmRate={
        auto:10,
        car:15,
        motorcycle:8

    }

    const perMinuteRate={
        auto:2,
        car:3,
        motorcycle:1.5
    }

     const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        motorcycle: Math.round(baseFare.motorcycle + ((distanceTime.distance.value / 1000) * perKmRate.motorcycle) + ((distanceTime.duration.value / 60) * perMinuteRate.motorcycle))
    };


    return fare;

}
module.exports.getFare=getFare;

function getOtp(num){
    function generateOtp(num){
        const otp=crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString();
        return otp;
    }
    return generateOtp(num);
}



module.exports.createRide=async({user,pickup,destination,vehicleType})=>{

    if(!user || !pickup || !destination || !vehicleType){
        throw new Error("All fields are required")
    }

    const fare=await getFare(pickup,destination)

    const ride=rideModel.create({
        user,
        pickup,
        destination,
        otp:getOtp(6),
        fare:fare[vehicleType]
    })

    return ride;
}



module.exports.confirmRide=async (rideId,captainId)=>{
    console.log(rideId+"ride services")

    if(!rideId){
        throw new Error("Ride id is required")
    }

    await rideModel.findOneAndUpdate({_id:rideId},{
        status:'accepted',
        captain:captainId

    })



    const ride=await rideModel.findOne({_id:rideId}).populate('user').populate('captain').select('+otp')

    if(!ride){
        throw new Error('Ride not found')
    }

    
    return ride;
}


module.exports.startRide=async ({rideId,otp,captain})=>{
    console.log(rideId+"ride services")

    if(!rideId || !otp){
        throw new Error("Ride id and OTP are required")
    }

    const ride=await rideModel.findOne({_id:rideId}).populate('user').populate('captain').select('+otp')

    if(!ride){
        throw new Error('Ride not found')
    }

    if(ride.status!='accepted'){
        throw new Error('Ride not accepted')

    }

    if(ride.otp!==otp){
        throw new Error('Invalid OTP')
    }

    await rideModel.findOneAndUpdate({_id:rideId},{
        status:'ongoing'
    })

    sendMessageToSocketId(ride.user.socketId,{
        event:'ride-started',
        data:ride
    })

    return ride;
}


module.exports.endRide=async ({rideId,captain})=>{

    console.log(rideId+"yha services m")
    

    if(!rideId ){
        throw new Error("Ride id is required")
    }
    console.log(captain._id+"captain id")

    const ride=await rideModel.findOne({_id:rideId,
        captain:captain._id
    }

    ).populate('user').populate('captain').select('+otp')

    if(!ride){
        throw new Error('Ride not found')
    }
    console.log(ride)

    if(ride.status!='ongoing'){
        throw new Error('Ride not ongoing')

    }
    console.log(ride.status)

    console.log(ride+"yha service m")

    await rideModel.findOneAndUpdate({_id:rideId},{

        status:'completed'
    })


    return ride;
}

