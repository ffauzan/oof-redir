


async function translateUrl (req, res, next) {
    const shortUrl = req.params.url
    console.log('url short is: ' + shortUrl)

    if (shortUrl) {
        if (shortUrl.length > 1) {
            // Some db stuff to get real URL based on shortened URL
            req.body.realUrl = 'http://google.com'
            next()
        }
    }
}


module.exports = {
    translateUrl
}