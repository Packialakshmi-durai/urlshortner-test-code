var mongoose = require("mongoose")
var shortId = require('shortid');

mongoose.connect("mongodb://192.168.4.63:27017/ud");

const UrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('shortUrl', UrlSchema)