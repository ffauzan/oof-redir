const router = require('express').Router()
const shortlinkController = require('../controller/shortlinkController')
const authMiddleware = require('../middleware/auth')

// router.post('/register', {})
// router.post('/login', {})
// router.get('/me', {})

router.post('/', authMiddleware.optUserAuth, shortlinkController.addShortlink)
router.put('/', authMiddleware.userAuth, shortlinkController.editShortLink)


module.exports = router