const router = require('express').Router()
const controller = require('../controllers/session.controller')

router.post('', controller.createSession)

module.exports = router