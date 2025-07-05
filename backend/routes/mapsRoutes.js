const express= require('express');
const router = express.Router();
const authMiddleware=require('../middlewares/authMiddleware')
const mapController = require('../controllers/mapController')
const {body}=require('express-validator')

router.post('/get-coordinates', body('address').isString().isLength({min:3}),
    authMiddleware.authUser,mapController.getCoordinates)


router.post('/get-distance-time',
    body('origin').isString().isLength({min:3}),
    body('destination').isString().isLength({min:3}),
    authMiddleware.authUser,mapController.getDistanceTime
)


router.post('/get-suggestions',body('input').isString().isLength({min:3}),
    authMiddleware.authUser,mapController.getSuggestions)



module.exports=router;