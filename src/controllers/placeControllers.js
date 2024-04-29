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
        let place
        let error = null

        const {name,address,photo,date,occupancy} = req.body.data

        try {
            place = await new Place({
                name:name,
                address:address,
                photo:photo,
                date:date,
                occupancy:occupancy,
            }).save()
        } catch (error){
            res.status(400).json({
                response: 'ERROR',
                success: false,
                error: error.message});
        } console.log(error);
    } 
}
module.exports = placeControllers