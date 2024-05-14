const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    lastName:{type:String, required:true},
    photo:{type:String},
    email:{type:String, required:true},
    password:{type:Array, required:true},
    age:{type:Number, required:true},
    genre:{type:String},
    events:[{type:mongoose.Types.ObjectId, ref:"event"}],
    role:{type:String, options: ["admin","user","organizer"], default:"user"},
    from: {type:Array, required:true},
    uniqueString:{type:String},
    userVerification:{type:Boolean}
})  

const User = mongoose.model('users',userSchema)
module.exports = User