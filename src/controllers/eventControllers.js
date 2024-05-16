const Event = require('../models/event')

const eventControllers={


    getAllEvents: async (req,res)=>{
        let events 
        let error = null

        try {
            events = await Event.find()
        } catch (err) {error= err}
        res.json({
        response: error ? 'ERROR' : {events},
        success: error ? false : true,
        error: error
        })
    },

    createEvent: async (req,res)=>{
        let event
        let error = null
        
        try{
            const{place,date,name,photo,description,attendees,minimumAge,organizer} = req.body.data
            
            const placeExisting = await Place.findById(place)
            if(!placeExisting){
                return res.status(400).json({
                    success: false,
                    message: 'el lugar no existe'
                });
            }

            const availableDate =  await Event.findOne({placeExisting: place, date:date})
            if(availableDate){
                return res.status(400).json({
                    success: false,
                    message: 'El lugar seleccionado no está disponible en esa fecha'
                });
            } 
            
            event = await new Event({
                placeExisting:place,
                date:date,
                name:name,
                photo:photo,
                description:description,
                attendees:attendees,
                minimumAge:minimumAge,
                organizer:organizer,
            }).save()
            res.status(201).json({
                success: true,
                message: 'Evento creado exitosamente',
                data: event
            });
        } catch(error){
            res.status(400).json({
                response: 'event not create',
                success: false,
                error: error.message});
        } console.log(error);
    },
    
    registerToEvent: async (req, res) => {
        try {
            const { eventId, userId } = req.body;
    
            // Verificar si el evento existe
            const event = await Event.findById(eventId);
            if (!event) {
                return res.status(404).json({
                    success: false,
                    message: 'El evento no existe'
                });
            }
    
            // Verificar la disponibilidad de cupos
            if (event.attendees.length >= MAX_ATTENDEES) {
                return res.status(400).json({
                    success: false,
                    message: 'El evento ya está completo'
                });
            }
    
            // Verificar la edad mínima
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'El usuario no existe'
                });
            }
            if (user.age < event.minimumAge) {
                return res.status(400).json({
                    success: false,
                    message: 'El usuario no cumple con la edad mínima requerida para este evento'
                });
            }
    
            // Registrar al usuario en el evento
            event.attendees.push(userId);
            await event.save();
    
            // Enviar una respuesta de éxito
            res.status(200).json({
                success: true,
                message: 'Usuario registrado en el evento exitosamente',
                data: event
            });
        } catch (error) {
            // Enviar una respuesta de error en caso de excepción
            res.status(500).json({
                success: false,
                message: 'No se pudo registrar al usuario en el evento',
                error: error.message
            });
        }
    }
    
}
module.exports = eventControllers

