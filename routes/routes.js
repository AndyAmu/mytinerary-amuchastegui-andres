const Router = require('express').Router();

const {getCities, getOneCity, addCity, modifyCity,multiplesCities, removeCity} = require('../controllers/citiesControllers');

const {getItineraries, getOneItinerary, addItinerary, modifyItinerary, removeItinerary, multiplesItinerary, getItinerariesByCity} = require('../controllers/itineraryControllers')

const {signInUser,singUpUsers} = require('../controllers/singControllers')

const validator = require('../config/validator')


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

//SingIn SingUp + validator
Router.route('/auth/signUp')
.post(validator, singUpUsers)

Router.route('/auth/signIn')
.post(signInUser)




module.exports = Router