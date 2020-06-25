const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')

router.post('/login', authController.login)
router.post('/register', userController.register)
    
module.exports = router