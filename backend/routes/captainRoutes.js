const express=require('express')
const router=express.Router()
const {body}=require("express-validator")
const captainController=require('../controllers/captainController')
const authMiddleware=require('../middlewares/authMiddleware')



router.post('/register',[
   body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({min:3}).withMessage('First name must be 3 character long'),

    body('password').isLength({min:6}).withMessage('Password must be 6 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be 6 characters long'),

    body('vehicle.plate').isLength({min:3}).withMessage('Plate must be 6 characters long'),

    body('vehicle.capacity').isInt({min:1}).withMessage('Capacity must be 1 characters long'),

    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid Type'),


],

captainController.registerCaptain
)



router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),

    body('password').isLength({min:6}).withMessage('Password must be 6 characters long')
],captainController.loginCaptain
)


router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile
)


router.get('/logout',authMiddleware.authCaptain,captainController.logoutCaptain
)


module.exports = router;