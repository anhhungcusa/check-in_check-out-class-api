const router = require('express').Router()
const userController = require('../controllers/user.controller')

router.get('', userController.getAll)

router.post('', userController.register) 

router.patch('/:id', userController.updateUser)

router.delete('/:id', userController.deleteUser)

router.get('/:id', userController.getUserById)

router.put('/:id', userController.changePassword)

module.exports = router