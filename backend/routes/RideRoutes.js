const express=require('express')
const router=express.Router();
const {body}=require('express-validator')
const rideController=require('../controllers/RideController')
const authMiddleware=require('../middlewares/authMiddleware')

router.post('/create',
    authMiddleware.authUser,
    [
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup Address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination Address'),
    body('vehicleType').isString().isIn(['auto','car','motorcycle']).withMessage('Invalid Vehicle Type')],
    rideController.createRide

)

module.exports=router;