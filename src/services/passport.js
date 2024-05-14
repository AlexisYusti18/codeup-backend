const passport=require('passport')
const jwtStrategy= require('passport-jwt').Strategy //REQUIERO STRATEGY
const extractJwt= require('passport-jwt').ExtractJwt//REQUIERO EXTRACTJWT
const User= require('../models/user') //REQUIERO MI MODELO USUARIO

module.exports= passport.use(new jwtStrategy({
    //DEFINO UN OBJECT QUE VA A TENER DOS PROPIEDADES :
   
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  
    secretOrKey: process.env.SECRET_KEY

   
},(jtw_payload, done)=>{
    
    User.findOne({_id:jtw_payload.id})

    .then((user)=>{
        //console.log(user)
        if(!user){
            //Si ES DIFERENTE AL USUARIO
            return done(null, false)
        }
        else {
            return done(null,user)
        }
    })
    .catch(error=>{
        //console.log(error.status)
        return done(error, false)
        //ERROR QUE LUEGO LLEGA COMO 401
    })
}))