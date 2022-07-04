const Router = require('express').Router();

const {getCities, getOneCity, addCity, modifyCity,multiplesCities, removeCity} = require('../controllers/citiesControllers');

const {getItineraries, getOneItinerary, addItinerary, modifyItinerary, removeItinerary, multiplesItinerary, getItinerariesByCity} = require('../controllers/itineraryControllers')

const {signInUser,singUpUsers, signOut,verifyEmail,verificationToken} = require('../controllers/singControllers')

const validator = require('../config/validator')

const passport = require('../config/passport')


// Cities
Router.route('/cities')
.get(getCities)
.post(addCity)

Router.route('/cities/:id')
.delete(removeCity)
.put(modifyCity)
.get(getOneCity)

Router.route("/multiplesCities")
.post(multiplesCities)

// Itineraries
Router.route('/itinery')
.get(getItineraries)
.post(addItinerary)

Router.route('/itinerary/:id')
.delete(removeItinerary)
.put(modifyItinerary)
.get(getOneItinerary)

Router.route("/multiplesItinerary")
.post(multiplesItinerary)

Router.route("/ItinerariesByCity/:id")
.get(getItinerariesByCity)

//SingIn SingUp + validator + verificacion de usuario
Router.route('/auth/signUp')
.post(validator, singUpUsers)

Router.route('/auth/signIn')
.post(signInUser)

Router.route('/verify/:uniqueString')
.get(verifyEmail)

//singUot
Router.route('/auth/signOut')
.post(signOut)


//Token
Router.route('/auth/loginToken')
.get(passport.authenticate('jwt',{ session: false }),verificationToken)

module.exports = Router