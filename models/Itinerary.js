const mongoose = require ('mongoose')

const itinerarySchema = new mongoose.Schema({
    title:{type: String, required: true},
    profilePic:{type: String, required: true},
    profilename:{type: String, required: true},
    likes:{type: String, required: true},
    hours:{type: String, required: true},
    price:{type: String, required: true},
    hashtag:{type: Array, default: []},    
    activities:{type: String, required: true},
    cityId:{type: mongoose.Schema.ObjectId , ref : 'cities'}
})
const Itinerary = mongoose.model('itineraries', itinerarySchema)
module.exports = Itinerary