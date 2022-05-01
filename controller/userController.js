
const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()
const jwtSecret = process.env.JWT_SECRET

async function registerUser(req, res) {
    // Basic check
    const { username, password } = req.body

    if (!password || !username) {
        return res.json({
            status: 0,
            message: 'mana username & passwordnyaaaaaaaa'
        })
    }

    if (password.length < 6) {
        return res.json({
            status: 0,
            message: 'password minimum length is 6'
        })
    }

    if (username.length < 4) {
        return res.json({
            status: 0,
            message: 'username minimum length is 4'
        })
    }

    // Check if username already used
    User.findOne({username: username}, 'username')
    .then(async (user) => {
        if (user) {
            console.log('already exist')
            return res.json({
                status: 0,
                message: 'Username already registered'
            })
        } else {
            // Register if username is unused
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new User({
                username: username,
                password: hashedPassword
            })

            // Try to save to db
            try {
                newUser.save()
                console.log(newUser)

                // Generate token
                const token = await JWT.sign(
                    {
                        username: username
                    },
                    jwtSecret,
                    {
                        expiresIn: '7d'
                    }
                )

                return res.json({
                    status: 1,
                    message: '',
                    data: {
                        token: token
                    }
                })
            } catch (err) {
                return res.json({
                    status: 0,
                    message: err.message
                })
            }
        }
    })
    .catch((err) => {
        return res.json({
            status: 0,
            message: err.message
        })
    })
}

module.exports = {
    registerUser,
}