const userModel=require('../models/userModel')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const blacklistToken=require('../models/blacklistTokenModel');
const captainModel = require('../models/captainModel');

module.exports.authUser=async(req,res,next)=>{
    

    req.token = req.cookies.token;

    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);


    if(!token){
        return res.status(401).json({message:'Unauthorized'});

    }

    const isBlacklisted=await blacklistToken.findOne({token})

    if(isBlacklisted){
        return res.status(401).json({message:'Unauthorized'})
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        

        const user=await userModel.findById(decoded._id)

       
        req.user=user;
       
        return next();

    } catch(err){
        return res.status(401).json({message:'Unauthorized'});

    }





}



module.exports.authCaptain=async(req,res,next)=>{
    // const token=req.cookies.token|| req.headers.authorization.split(' ')[1];

    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);


    if(!token){
        return res.status(401).json({message:'Unauthorized'});

    }

    const isBlacklisted=await blacklistToken.findOne({token})

    if(isBlacklisted){
        return res.status(401).json({message:'Unauthorized'})
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);


        const captain=await captainModel.findById(decoded.id)
        req.captain=captain;

        return next();

    } catch(err){
        return res.status(401).json({message:'Unauthorized'});

    }





}