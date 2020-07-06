const router = require('express').Router()
const controller = require('../controllers/room.controller')

router.post('', controller.createRoom)

router.get('', controller.getRooms)

router.delete('/:id', controller.deleteRoomById)

router.patch('/:id', controller.editRoomById)

module.exports = router