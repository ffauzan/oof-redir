const router = require('express').Router()
const userController = require('../controller/userController')

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
// router.get('/me', {})


module.exports = router