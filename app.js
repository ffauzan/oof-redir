const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const userRoute = require('./routes/user')
const shortlinkRoute = require('./routes/shortlink')
const { translateUrl } = require('./middleware/shortlinkTranslate')

const PORT = process.env.PORT || 3000
dotenv.config()

const app = express()
app.use(cors({
    origin: '*'
}))

app.use(express.json())

// Routes
app.use('/api/user', userRoute)
app.use('/api/shortlink', shortlinkRoute)



app.get('/', (req, res) => {
    res.send('Halo Duniaaaaaaa.........')
})

app.get('/:url', translateUrl, (req, res) => {
    const realUrl = req.body.realUrl
    const ip = req.socket.remoteAddress
    console.log(`Redirecting ${ip} to ${realUrl}`)
    res.redirect(realUrl)
})

app.get('/f', (req, res) => {
    res.redirect('http://google.com')
    let ip = req.socket.remoteAddress
    console.log(ip)
})

// Run this thing
app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
})



