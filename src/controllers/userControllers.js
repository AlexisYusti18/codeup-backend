const User= require('../models/user')
const bcryptjs= require('bcryptjs')
const crypto= require('crypto') //IMPORTO CRYPTO =>PAQUETE DE NODE
const verification = require('../services/verification')
const jwt = require('jsonwebtoken')//REQUIERO JWT

const userControllers ={
    signUp:async (req,res)=>{
        let {name,lastName,photo,email,password,age,genre,role,from}= req.body.userData

        try{
           const userExists = await User.findOne({email})
            if(userExists) {
                
                if(userExists.from.indexOf(from) !== -1){
                    res.json({
                        success:false,
                        from:from,
                        message: 'You are already registered with'+' '+from+' '+',LOG IN!' //ya estas registrado con from, inicia sesion!
                    })
                }
               
                else{
                    const passwordHash= bcryptjs.hashSync(password, 10)
                    userExists.from.push(from)
                    userExists.password.push(passwordHash)
    

                    if(from === "singUp"){
                        userExists.uniqueString= crypto.randomBytes(15).toString('hex')
                        await userExists.save()
                        await verification(email, userExists.uniqueString) 
                        res.json({
                            success: true,
                            from:from,
                            message:"Verify your email and then enter with LogIn!"
                        })
                    } else{
                        userExists.userVerification =true 
                        userExists.save()
                        res.json({
                            success:true,
                            from:from,
                            message: from +' '+'has been added to your login method!'
                        })
                    }
                    
                } 
            }
                    //QUE EL USUARIO NO HAYA SIDO ENCONTRADO EN LA BASE DE DATOS => USUARIO NUEVO
                    else {
                        const passwordHash= bcryptjs.hashSync(password, 10)
                        const uniqueString = crypto.randomBytes(15).toString('hex')
                        const newUser= await new User({
                            name,
                            lastName,
                            photo,
                            email,
                            password:[passwordHash],
                            age,
                            genre,
                            role,
                            userVerification:false,
                            uniqueString:uniqueString,
                            from : [from]

                        })
                        //VERIFICO SI EL FROM ES DIFERENTE A MI FORMULARIO DE REGISTRO
                        if(from !== 'signUp'){
                            await newUser.save()
                            res.json({
                                success: true,
                                from:from,
                                message: `check ${email} and finish you Sign up` 
                            })
                        } 
                        else{ 
                                await newUser.save()
                                await verification(email, newUser.uniqueString) 
                                res.json({
                                    success: true,
                                    from:from,
                                    message: 'Verify your email and then enter with LogIn!'//Confirma tu verificacion de email
                                })
                        }
                    } 
            } catch(error){
                console.error('Error signing up:', error);
                res.status(500).json({ success: false, message: 'Internal Server Error' });
                //console.log(error)
                // res.json({
                //     success: false,
                //     message:'Something went wrong, please try again later' //Algo ha salido mal, intenta de nuevo mas tarde
                // })
            }
        
        },

    
logIn: async (req, res)=>{
    console.log(req.body)
    const {email, password, from}= req.body.logInUser
    try{
        const userExists=await User.findOne({email})
        //console.log(userExists);
        let passwordCoincide= userExists.password.filter(pass=> bcryptjs.compareSync(password, pass))
        if(from !== 'signUp'){
            
            if(passwordCoincide.length > 0){
                
                const userData = {
                    id:userExists._id,
                    name: userExists.name,
                    lastName: userExists.lastName,
                    photo: userExists.photo,
                    email: userExists.email,
                    age: userExists.age,
                    genre: userExists.genre,
                    from:from
                }
                await userExists.save()
                const token= jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn:60*60*24})
                //console.log('token arriba'+ token);
                res.json({
                    success:true,
                    from:from,
                    response:{token,userData},
                    message: 'WELCOME BACK' + userData.name + userData.lastName
                })
    
            } else {
                res.json({
                    success: false,
                    from:from,
                    message:'no register with' + from
                })
            }
        }
        else {
            if(passwordCoincide.length>0) {
                //console.log('passwordCoincide' + passwordCoincide);
                //console.log('userExists'+ userExists);
                if(userExists.userVerification){
                    const userData = {
                        id:userExists._id,
                        name: userExists.name,
                        lastName: userExists.lastName,
                        photo: userExists.photo,
                        email: userExists.email,
                        age: userExists.age,
                        genre: userExists.genre,
                        from:from
                    }
                    await userExists.save()
                    const token= jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn:60*60*24})
                    //console.log(token);
                    res.json({
                        success:true,
                        from:from,
                        response:{token, userData},
                        message:'WELCOME' + userData.name + userData.lastName
                    })
                }else {
                    res.json({
                        success:false,
                        from:from,
                        message:'verify email'
                    })
                }
            } else{
                res.json({
                    success:false,
                    from:from,
                    message:'the password or the email does not match, verify the data'
                })
        }
        } 
    } catch(error){
        console.error('Error logging in:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
        // console.log(error)
        // res.json({
        //     success: false,
        //     message:'Something went wrong, please try again later' //Algo ha salido mal, intenta de nuevo mas tarde
        // })
    // }
    
},
logOut: async (req, res) => {
    const email = req.body.closeUser
    const user = await User.findOne({ email })
    await user.save()
    res.json({
      success: true,
      message: 'Come back soon'
    })
  },

        verifyEmail: async(req, res)=>{
            const { uniqueString } = req.params;
                try {
                    const user = await User.findOne({ uniqueString: uniqueString });

                    if (user) {
                        user.userVerification = true;
                        await user.save();
                        res.redirect("http://localhost:4000/logIn");
                    } else {
                        res.json({
                            success: false,
                            message: 'email not confirmed'
                        });
                    }
                }           catch (error) {
                    console.error('Error verifying email:', error);
                    res.status(500).json({
                        success: false,
                        message: 'internal server error'
                    });
                }
        },

        verifyToken: async (req,res)=>{
            if(req.user) {
                res.json({
                    success:true,
                    response:{
                        id:req.user._id,
                        name:req.user.name ,
                        lastName: req.user.lastName,
                        photo: req.user.photo,
                        email: req.user.email,
                        age: req.user.age,
                        genre:req.user.genre,
                        from:'token'
                    },
                    message: 'Welcome Back' +' '+req.user.name + req.user.lastName
                })
            }
            else {
                res.json({
                    success: false,
                    message: 'Please do LOGIN again' //Por favor realize nuevamente LOGIN
                })
            }
        }
}
module.exports= userControllers