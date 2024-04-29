const Router = require('express').Router();

const eventControllers = require('../controllers/eventControllers');
const {getAllEvents,createEvent} = eventControllers

const placeControllers = require('../controllers/placeControllers');
const {getAllPlaces,createPlace} = placeControllers

Router.route('/events')
.get(getAllEvents)
.post(createEvent)

Router.route('/places')
.get(getAllPlaces)
.post(createPlace)

module.exports= Router
