const router = require('express').Router()
const shortlinkController = require('../controller/shortlinkController')

// router.post('/register', {})
// router.post('/login', {})
// router.get('/me', {})

router.post('/', shortlinkController.addShortlink)


module.exports = router