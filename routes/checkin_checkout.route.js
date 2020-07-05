const router = require('express').Router()
const controller = require('../controllers/checkin_checkout.controller')

router.post('/', controller.checking)

router.get('/:id', controller.getCheckinCheckouts)

module.exports = router