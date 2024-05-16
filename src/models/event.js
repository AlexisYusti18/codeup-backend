const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    place:{type:mongoose.Types.ObjectId, ref:"places"},
    date :{type:Date, required: true},
    name:{type:String, required:true}, 
    photo:{type:String},
    description:{type:String, required:true},
    attendees:[{type:mongoose.Types.ObjectId, ref:"users"}],
    minimumAge:{type:Number, required:true},
    organizer: {type:mongoose.Types.ObjectId, ref:"users", required:true}  
})

const Event = mongoose.model('events', eventSchema)
module.exports = Event