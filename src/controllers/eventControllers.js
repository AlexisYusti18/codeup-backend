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

        const{place,date,name,photo,description,attendees,minimumAge,organizer} = req.body.data
        try{
            event = await new Event({
                place:place,
                date:date,
                name:name,
                photo:photo,
                description:description,
                attendees:attendees,
                minimumAge:minimumAge,
                organizer:organizer,
            }).save()
        } catch(error){
            res.status(400).json({
                response: 'ERROR',
                success: false,
                error: error.message});
        } console.log(error);
    }
}
module.exports = eventControllers

