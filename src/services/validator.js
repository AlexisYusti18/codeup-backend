const joi= require('joi') //IMPORTO JOI

const validator= (req, res , next) =>{
    //console.log(req.body.userData);
    const schema = joi.object({
        name: joi.string()
        .min(4)
        .max(20)
        .required()
        .pattern(new RegExp('[a-zA-Z]'))
        .messages({
            'string.min':'"name": error min 4 characters',
            'string.max':'"name": error max 20 characters'
        }),
        lastName: joi.string()
        .min(4)
        .max(20)
        .required()
        .pattern(new RegExp('[a-zA-Z]'))
        .messages({
            'string.min':'"lastName": error min 4 characters',
            'string.max':'"lastName": error max 20 characters'
        }),
        email: joi.string()
            .email({minDomainSegments:2})
            .required()
            .messages({ 'string.email':'"email": incorrect format'
        }),
        
        password: joi.string()
        .min(2)
        .max(40)
        .required()
        .pattern(new RegExp('[a-zA-Z]'))
        .messages({
            'string.min':'"password": error min 2 characters',
            'string.max':'"password": error max 20 characters'
        }),
        genre:joi.string()
        .required()
        .min(2)
        .max(20)
        .messages({
            'string.min':'"genre": error min 2 characters',
            'string.max':'"genre": error max 20 characters'
        }),
        photo:joi.string()
        .min(3)
        .messages({
            'string.min':'"photo": error min 3 characters',
        }),
        age:joi.number()
        .min(2)
        .messages({
            'number.min':'"age": error min 2 characters',
        }),
        role:joi.string()
        .required()
        .min(2)
        .messages({
            'string.min':'"role": error min 2 characters',
        }),
                
        from: joi.string().required()
    })
        const validation= schema.validate(req.body.userData, {abortEarly:false})
            if(validation.error) {
                //console.log(validation);
                return res.json({
                    success: false,
                    from:"validator",
                    message: validation.error.details,
                    test: validation
                })
            }
    next()
}
module.exports= validator