const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const PORT = process.env.PORT || 3000
dotenv.config()

const app = express()
app.use(cors({
    origin: '*'
}))

app.use(express.json())

// Routes




app.get('/', (req, res) => {
    res.send('Nothing Here')
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



