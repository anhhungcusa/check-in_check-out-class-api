const router = require('express').Router()
const userController = require('../controllers/user.controller')

router.get('', userController.getAll)

router.post('', userController.register)   

router.delete('/:id', userController.deleteUser)

module.exports = router