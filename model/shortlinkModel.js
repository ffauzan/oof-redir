const mongoose = require('mongoose')


const shortLinkSchema = new mongoose.Schema({
    shortUrl: String,
    longUrl: String
})

const shortLinkModel = mongoose.model("Shortlink", shortLinkSchema)

module.exports = shortLinkModel