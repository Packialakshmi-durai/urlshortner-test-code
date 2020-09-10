var mongoose = require("mongoose")
var shortId = require('shortid');

mongoose.connect("mongodb://192.168.4.63:27017/ud");

const loginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    email: { type: String, required: true, unique: true }
})



module.exports = mongoose.model('loginSchema', loginSchema)