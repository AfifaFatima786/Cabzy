const userModel=require('../models/userModel')
const userService=require('../services/userServices')
const {validationResult}=require('express-validator')
const generateAuthToken=require('../models/userModel')

module.exports.registerUser=async(req,res,next)=>{
    const errors=validationResult(req);   /*isse phle srf check hoga ki sb fields ho but handle us error ko hm yhi controller me hi krege*/

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }


    const {fullname,email,password}=req.body;
    console.log(req.body)

    const hashed=await userModel.hashPassword(password)

    const user=await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashed
    })

    const token=generateAuthToken();

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
        res.status(200).json({token,user})

        
    


}