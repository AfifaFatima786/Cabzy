const userModel=require('../models/userModel')
const userService=require('../services/userServices')
const {validationResult}=require('express-validator')
const generateAuthToken=require('../models/userModel')
const blacklistTokenModel=require('../models/blacklistTokenModel')

module.exports.registerUser=async(req,res,next)=>{
    const errors=validationResult(req);   /*isse phle srf check hoga ki sb fields ho but handle us error ko hm yhi controller me hi krege*/

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }


    const {fullname,email,password}=req.body;
    console.log(req.body)



    const isUserAlreadyExist=await userModel.findOne({email})
    
        if(isUserAlreadyExist){
            return res.status(400).json({message:'User Already exist'})
        }



    const hashed=await userModel.hashPassword(password)

    const user=await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashed
    })

    const token=generateAuthToken();
    res.cookie('token',token)

    res.status(201).json({token,user})


}


module.exports.loginUser=async(req,res,next)=>{
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(4000).json({errors:errors.array()})
    }


    const {email,password}=req.body;

    const user=await userModel.findOne({email}).select('+password');      /*by default password is not selected*/

    if(!user){
        return res.status(401).json({message:'Invalid email or password'});  
    }

    const isMatch=await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:'Invalid email or password'});  

    }

        const token=user.generateAuthToken();
        res.cookie('token',token)
        res.status(200).json({token,user})

        
    


}

module.exports.getUserProfile=async(req,res,next)=>{
    res.status(200).json(req.user)
}


module.exports.logoutUser=async(req,res,next)=>{
    res.clearCookie('token');

    const token=req.cookies.token||req.headers.authorization.split(' ')[1];

    await blacklistTokenModel.create({token});

    res.status(200).json({message:'Logged Out'})


    
}