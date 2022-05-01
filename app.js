const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')

const userRoute = require('./routes/user')
const shortlinkRoute = require('./routes/shortlink')
const { translateUrl } = require('./middleware/shortlinkTranslate')
const { shortlinkRedir } = require('./controller/shortlinkController')

const PORT = process.env.PORT || 3000
dotenv.config()

const MONGODB_URL = process.env.MONGODB_URL

mongoose.connect(MONGODB_URL, () => {
    console.log('connected')
}, (err) => {
    console.log(err.message)
})

const app = express()
app.use(cors({
    origin: '*'
}))

app.use(express.json())

// Routes
app.use('/api/user', userRoute)
app.use('/api/shortlink', shortlinkRoute)



app.get('/', (req, res) => {
    res.send('There is no Frontend yet, ehe')
})


app.get('/:url', translateUrl, shortlinkRedir)

// Run this thing
app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
})



