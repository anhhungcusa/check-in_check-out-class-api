const router = require('express').Router()
const userController = require('../controllers/user.controller')

router.post('', userController.requireAcceptToekn) 

module.exports = router