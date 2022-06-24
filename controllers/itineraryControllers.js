const Itinerary = require('../models/itinerary')

const itineraryControllers = {

    getItineraries: async (req, res) => {
        let itineraries 
        let error = null 
        try { 
            itineraries = await Itinerary.find() 
        } catch (err) { error = err } 
        res.json({
            response: error ? 'ERROR' : { itineraries }, 
            success: error ? false : true,
            error: error
        })
    },
    getOneItinerary: async (req, res) => {
        const id = req.params.id
        let itinerary
        let error = null
        try {
            itinerary = await Itinerary.findOne({ _id: id }) 
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : { itinerary },
            success: error ? false : true,
            error: error
        })
    }
    ,
    addItinerary: async (req, res) => {
        const { title, profilePic, profilename, likes, hours, price, hashtag, activities,cityId } = req.body.data
        let itinerary
        let error = null
        try {
            itinerary = await new Itinerary({
                title: title,
                profilePic: profilePic,
                profilename: profilename,
                likes: likes,
                hours: hours,
                price: price,
                hashtag: hashtag,
                activities: activities,
                cityId: cityId
            }).save()
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : itinerary,
            success: error ? false : true,
            error: error
        })
    },
    
    modifyItinerary: async (req, res) => {
        const id = req.params.id
        const itinerary = req.body
        let itinerarydb
        let error = null
        try {
            itinerarydb = await Itinerary.findOneAndUpdate( 
                { _id: id }, 
                itinerary,
                { new: true }) 
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : itinerarydb,
            success: error ? false : true,
            error: error
        })
    },

    removeItinerary: async (req, res) => {
        const id = req.params.id
        let itinerary
        let error = null
        try {
            itinerary = await Itinerary.findOneAndDelete({ _id: id })
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : itinerary,
            success: error ? false : true,
            error: error
        })
    },

    multiplesItinerary: async (req, res) => {
        let itinerary = []
        const data = req.body.data
        let error = null
        try {
            data.map(async (item) => {
                await new Itinerary({
                    title: item.title,
                    profilePic: item.profilePic,
                    profilename: item.profilename,
                    likes: item.likes,
                    hours: item.hours,
                    price: item.price,
                    hashtag: item.hashtag,
                    activities: item.activities,
                    cityId: item.cityId,
                }).save()
            })
        } catch (err) { error = err }
        itinerary = await Itinerary.find()
        res.json({
            response: error ? 'ERROR' : itinerary,
            success: error ? false : true,
            error: error
        })
    },
    getItinerariesByCity: async (req,res) => {
        const id = req.params.id
        let itineraries
        let error = null
        try {
            itineraries = await Itinerary.find({ cityId : id })
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : itineraries,
            success: error ? false : true,
            error: error
        })
    }
}

module.exports = itineraryControllers