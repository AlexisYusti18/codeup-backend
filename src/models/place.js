const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name:{type:String, required:true},
    address:{type:String, required:true},
    photo:{type:String},
    date:[{type:mongoose.Types.ObjectId, ref:"events"}],
    occupancy:{type:Number, required:true}
})

const Place = mongoose.model('places', placeSchema)
module.exports = Place