const Place = require('../models/place')

const placeControllers = {

    getAllPlaces : async (req, res) =>{
        let places
        let error = null

        try {
            places = await Place.find()
        } catch (err) {error = err}
        res.json({
            response: error ? 'ERROR' : {places},
            success: error ? false : true,
            error: error
            })
    } , 

    createPlace : async (req , res) =>{
       
        const {name,address,photo,date,occupancy} = req.body.data

        try {
            const place = new Place({
                name:name,
                address:address,
                photo:photo,
                date:date,
                occupancy:occupancy,
            })
                await place.save()
                res.status(201).json({
                    response: 'place created',
                    success: true,
                    place,
                });
        } catch (error){
            console.error(error); 
            res.status(400).json({
                response: 'ERROR',
                success: false,
                error: error.message
            })
        } 
    } 
}
module.exports = placeControllers