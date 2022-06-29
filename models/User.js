const mongoose = require ('mongoose')

const usersShema = new mongoose.Schema({
    nameUser:{type:String, require:true},
    lastNameUser:{type:String, require:true},
    photoUser:{type:String, require:true},
    email: {type:String, required:true},
    country: {type:String},
    from : {type:Array},
    password: {type:Array, required:true}, 
})
const Users = mongoose.model('users', usersShema)
module.exports = Users