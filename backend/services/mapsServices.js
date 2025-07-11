const axios = require('axios');
const captainModel=require('../models/captainModel')


module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[ 0 ].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}



module.exports.getDistanceTime = async (origin, destination) => {


    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }


    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK') {
            if(response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No route found');
            }
                return response.data.rows[0].elements[0];
            
           
        }else{
            throw new Error('Unable to fetch distance and time');
        }
        
    } catch (err) {
       console.error(err);
        throw err;
    }
}

module.exports.getSuggestions = async (input) => {
    if(!input){
        throw new Error('Query is required');
    }


    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;


    try{

        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => ({
                description: prediction.description,
                terms: prediction.terms, // [{ value: "Jamia", offset: 0 }, ...]
                matched_substrings: prediction.matched_substrings, // [{ length, offset }]
                place_id: prediction.place_id
            }));

        } else {
            throw new Error('Unable to fetch suggestions');
        }

    }
    catch(err){
        console.error(err);
        throw err;
    }
}


module.exports.getCaptainsInTheRadius=async(ltd,lng,radiusKm)=>{
    console.log(ltd)
    console.log("Searching near:", { lng, ltd, radius: radiusKm / 6371 });

    const captains=await captainModel.find({
        
        location:{
         $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, ltd] 
        },
        $maxDistance: radiusKm * 1000 // radius in meters
      }}
        
    })
    

    
    return captains;

}