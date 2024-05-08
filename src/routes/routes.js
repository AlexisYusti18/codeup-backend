const Router = require('express').Router();

const eventControllers = require('../controllers/eventControllers');
const {getAllEvents,createEvent} = eventControllers

const placeControllers = require('../controllers/placeControllers');
const {getAllPlaces,createPlace} = placeControllers

const userControllers = require('../controllers/userControllers')
const {signUp,logIn,verifyToken} = userControllers

Router.route('/events')
.get(getAllEvents)
.post(createEvent)

Router.route('/places')
.get(getAllPlaces)
.post(createPlace)

Router.route('/signUp')
.post(signUp)

Router.route('/logIn')
.post(logIn)

Router.route('/logInToken')
.get(passport.authenticate('jwt', {session: false}), verifyToken)

module.exports= Router
