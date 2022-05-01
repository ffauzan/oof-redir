const router = require('express').Router()
const shortlinkController = require('../controller/shortlinkController')
const authMiddleware = require('../middleware/auth')


router.post('/', authMiddleware.optUserAuth, shortlinkController.addShortlink)
router.put('/', authMiddleware.userAuth, shortlinkController.editShortLink)
router.delete('/:shortUrl', authMiddleware.userAuth, shortlinkController.deleteShortlink)


module.exports = router