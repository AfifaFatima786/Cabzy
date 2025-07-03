const express= require('express');
const router = express.Router();
const authMiddleware=require('../middlewares/authMiddleware')
const mapController = require('../controllers/mapController')
const {query}=require('express-validator')

router.post('/get-coordinates', query('address').isString().isLength({min:3}),
    authMiddleware.authUser,mapController.getCoordinates)


router.post('/get-distance-time',
    query('origin').isString().isLength({min:3}),
    query('destination').isString().isLength({min:3}),
    authMiddleware.authUser,mapController.getDistanceTime
)


router.post('/get-suggestions',query('input').isString().isLength({min:3}),
    authMiddleware.authUser,mapController.getSuggestions)



module.exports=router;