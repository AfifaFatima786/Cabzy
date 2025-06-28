const captainModel=require('../models/captainModel')
const captainService=require('../services/captainServices')

const {validationResult}=require('express-validator')
const generateToken=require('../models/captainModel')
const blacklistTokenModel=require('../models/blacklistTokenModel')




module.exports.registerCaptain=async(req,res,next)=>{
    const errors=validationResult(req);   /*isse phle srf check hoga ki sb fields ho but handle us error ko hm yhi controller me hi krege*/
    console.log("reuest aaa gyi")
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }


    const {fullname,email,password,vehicle}=req.body;
    console.log(req.body)


    const isCaptainAlreadyExist=await captainModel.findOne({email})

    if(isCaptainAlreadyExist){
        return res.status(400).json({message:'Captain Already exist'})
    }

    const hashed=await captainModel.hashPassword(password)

    const captain=await captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashed,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    })

    const token=generateToken();
    res.cookie('token',token)

    res.status(201).json({token,captain})


}



module.exports.loginCaptain=async(req,res,next)=>{
  
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(4000).json({errors:errors.array()})
    }


    const {email,password}=req.body;

    const captain=await captainModel.findOne({email}).select('+password');      /*by default password is not selected*/

    if(!captain){
        return res.status(401).json({message:'Invalid email or password'});  
    }

    const isMatch=await captain.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:'Invalid email or password'});  

    }

        const token=captain.generateToken();
        res.cookie('token',token)
        res.status(200).json({token,captain})

        
    


}


module.exports.getCaptainProfile=async(req,res,next)=>{
    res.status(200).json(req.captain)
}



module.exports.logoutCaptain=async(req,res,next)=>{
    res.clearCookie('token');

    const token=req.cookies.token||req.headers.authorization.split(' ')[1];

    await blacklistTokenModel.create({token});

    res.status(200).json({message:'Logged Out'})


    
}




