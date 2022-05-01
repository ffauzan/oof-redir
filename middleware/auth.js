const JWT = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const jwtSecret = process.env.JWT_SECRET

async function userAuth(req, res, next) {
    const authHeader = req.header('Authorization')

    if (!authHeader) {
        return res.json({
            status: 0,
            message: 'unauthorized'
        })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.json({
            status: 0,
            message: 'no token found'
        })
    }

    try {
        let userPayload = await JWT.verify(token, jwtSecret)
        req.body.username = userPayload.username
        // console.log(userPayload)
        next() 
    } catch (error) {
        return res.json({
            status: 0,
            message: 'invalid token'
        })
    }
}

async function optUserAuth(req, res, next) {
    const authHeader = req.header('Authorization')

    if (authHeader) {
        const token = authHeader.split(' ')[1]
        if (token) {
            try {
                let userPayload = await JWT.verify(token, process.env.JWT_SECRET)
                req.body.username = userPayload.username
                // console.log(userPayload)
                next() 
            } catch (error) {
                req.body.username = ''
                next()
            }
        } else {
            req.body.username = ''
            next()
        }
    } else {
        req.body.username = ''
        next()
    }
}

module.exports = {
    userAuth,
    optUserAuth
}