const express=require('express')
const router=express.Router();
const {body,query}=require('express-validator')
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

router.get('/get-fare',
    authMiddleware.authUser,
    [query('pickup').isString().isLength({min:3}).withMessage('Invalid pickup Address'),
    query('destination').isString().isLength({min:3}).withMessage('Invalid destination Address')],
    
    rideController.getFare
)

router.post('/confirm',
    authMiddleware.authCaptain,
   
    
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.confirmRide
)


router.get('/start-ride',
    authMiddleware.authCaptain,
    [query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({min:6,max:6}).withMessage('Invalid otp')],
    rideController.startRide
)


module.exports=router;