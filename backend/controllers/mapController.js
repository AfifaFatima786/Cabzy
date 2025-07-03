const mapsService = require('../services/mapsServices');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }   

    const {address}=req.query;
    try {
        const coordinates = await mapsService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        res.status(404).json({ message: 'Error fetching coordinates' });
    }
}



module.exports.getDistanceTime = async (req, res) => {
    try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }   

    const {origin,destination}=req.query;

    const distanceTime=await mapsService.getDistanceTime(origin,destination)

    res.status(200).json(distanceTime);
    
        


    } catch (error) {
        console.error('Error fetching distance and time:', error);
        res.status(404).json({ message: 'Error fetching distance and time' });
    }
}



module.exports.getSuggestions = async (req, res) => {

    try{

        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }


        const {input}=req.query;

        const suggestions=await mapsService.getSuggestions(input);
        res.status(200).json(suggestions);

    }

    catch(err){
        console.error('Error fetching suggestions:', err);
        res.status(404).json({ message: 'Error fetching suggestions' });
    }


}