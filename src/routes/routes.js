const Router = require('express').Router();
const validator = require('../services/validator')
const passport = require('../services/passport')


const eventControllers = require('../controllers/eventControllers');
const {getAllEvents,createEvent} = eventControllers

const placeControllers = require('../controllers/placeControllers');
const {getAllPlaces,createPlace} = placeControllers

const usersControllers= require('../controllers/userControllers')
const {signUp,logIn,logOut,verifyEmail,verifyToken} = usersControllers

Router.route('/events')
.get(getAllEvents)
.post(createEvent)

Router.route('/places')
.get(getAllPlaces)
.post(createPlace)

Router.route('/signUp')
.post(validator,signUp)

Router.route('/logIn')
.post(logIn)

Router.route('/logOut')
.post(logOut)

Router.route('/verify/:uniqueString')
.get(verifyEmail)

Router.route('/logInToken')
.get(passport.authenticate('jwt', {session: false}), verifyToken)

module.exports= Router
