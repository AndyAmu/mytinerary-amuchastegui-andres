const mongoose = require ('mongoose')

const itinerarySchema = new mongoose.Schema({
    title:{type: String, required: true},
    profilePic:{type: String, required: true},
    profilename:{type: String, required: true},
    likes:{type: Number, required: true},
    hours:{type: Number, required: true},
    price:{type: Number, required: true},
    hashtag:{type: Array, default: []},    
    activities:{type: String, required: true}
})
const Itinerary = mongoose.model('itinerary', itinerarySchema)
module.exports = Itinerary