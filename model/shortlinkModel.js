const mongoose = require('mongoose')


const shortLinkSchema = new mongoose.Schema({
    shortUrl: String,
    longUrl: String,
    updated: { type: Date, default: Date.now() },
    owner: String
})

const shortLinkModel = mongoose.model("Shortlink", shortLinkSchema)

module.exports = shortLinkModel