const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    place:{type:mongoose.Types.ObjectId, ref:"place"},
    date :{type:Date, required: true},
    name:{type:String, required:true},
    photo:{type:String},
    description:{type:String, required:true},
    attendees:[{type:mongoose.Types.ObjectId, ref:"user"}],
    minimumAge:{type:Number, required:true},
    organizer: {type:mongoose.Types.ObjectId, ref:"user", required:true}  
})

const Event = mongoose.model('events', eventSchema)
module.exports = Event