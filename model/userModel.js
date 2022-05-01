const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    updatetd: { type: Date, default: Date.now() },
})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel