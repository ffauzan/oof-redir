const Shortlink = require('../model/shortlinkModel')


async function translateUrl (req, res, next) {
    const shortUrl = req.params.url
    console.log('url short is: ' + shortUrl)

    if (shortUrl) {
        if (shortUrl.length > 1) {
            // Some db stuff to get real URL based on shortened URL
            Shortlink.findOne({shortUrl: shortUrl}, 'longUrl')
            .then((shortlink) => {
                if (shortlink) {
                    const realUrl = shortlink.longUrl
                    req.body.realUrl = realUrl
                    next()
                } else {
                    return res.sendStatus(404)                }
            })
            .catch((err) => {
                console.log(err.message)
                return res.sendStatus(404)
            })
        }
    }
}


module.exports = {
    translateUrl
}