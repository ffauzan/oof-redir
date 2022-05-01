const mongoose = require('mongoose')
const dotenv = require('dotenv')

const Shortlink = require('../model/shortlinkModel')

async function shortlinkRedir(req, res) {
    const url = req.body.realUrl
    console.log(`Real url is ${url}`)
    return res.redirect(url)
}

async function addShortlink(req, res) {
    const { shortUrl, longUrl } = req.body
    let username = req.body.username
    console.log(shortUrl)

    if (!username) {
        console.log('No owner identity')
        username = ''
    }

    // Basic Checking
    if (shortUrl && longUrl) {
        // Length check
        if (shortUrl.length > 2) {
            // Check if shortlink already used
            Shortlink.findOne({shortUrl: shortUrl}, 'shortUrl longUrl updated')
            .then((shortlink) => {
                if (shortlink) {
                    console.log('already exist')
                    return res.json({
                        status: 0,
                        message: 'Shortlink already registered'
                    })
                } else {
                    // All check passed and do the thing it is supposed to do
                    // Create
                    const newShortLink = new Shortlink({
                        shortUrl: shortUrl,
                        longUrl: longUrl,
                        owner: username
                    }) 
                    
                    // Try to save to db
                    try {
                        newShortLink.save()
                        return res.json({
                            status: 1,
                            message: '',
                            data: newShortLink
                        })
                    } catch (err) {
                        return res.json({
                            status: 0,
                            message: err.message
                        })
                    }
                }
            })
            .catch(err => {
                console.log('an error')
                return res.json({
                    status: 0,
                    message: err.message
                })
            })
        }
    }
}


async function editShortLink(req, res) {
    const { shortUrl, longUrl, username } = req.body

    // Basic Checking
    if (shortUrl && longUrl) {
        // Length check
        if (shortUrl.length > 2) {
            // Check if shortlink is exist
            Shortlink.findOne({shortUrl: shortUrl}, 'shortUrl longUrl owner updated')
            .then((shortlink) => {
                if (shortlink) {
                    // console.log('already exist')

                    // If shortlink belong to this user
                    if (shortlink.owner === username) {
                        shortlink.longUrl = longUrl
                        shortlink.updated = Date.now()
                        shortlink.save()

                        return res.json({
                            status: 1,
                            message: '',
                            data: shortlink
                        })
                        
                    } else {
                        return res.json({
                            status: 0,
                            message: 'Shortlink is not yours'
                        })
                    }
                } else {
                    return res.json({
                        status: 0,
                        message: 'Shortlink not found'
                    })
                }
            })
            .catch(err => {
                console.log('an error')
                return res.json({
                    status: 0,
                    message: err.message
                })
            })
        }
    }
}

// async function addShortlink(shortUrl, longUrl) {
//     const newShortLink = new Shortlink({
//         shortUrl: shortUrl,
//         longUrl: longUrl
//     }) 

//     try {
//         await newShortLink.save()
//         console.log(newShortLink)
//     } catch (err) {
//         console.log(err.message)
//     }
// }


module.exports = {
    addShortlink,
    shortlinkRedir,
    editShortLink,
}