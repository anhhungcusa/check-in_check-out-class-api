// routes
const session = require('./session.route')
const room = require('./room.route')
const user = require('./user.route')
const auth = require('./auth.route')
const checkinAndCheckout = require('./checkin_checkout.route')
const token = require('./token.route')

// middlewares
const authMiddleware = require('../middlewares/auth')

// init rest routes
module.exports = (router) => {
  const prefix = '/api/v1'
  router.use(`${prefix}/sessions`, authMiddleware.isAuthorized, session)
  router.use(`${prefix}/rooms`, authMiddleware.isAuthorized, room)
  router.use(`${prefix}/users`, authMiddleware.isAuthorized, user)
  router.use(`${prefix}/checkin-checkout`, authMiddleware.isAuthorized, checkinAndCheckout)
  router.use(`${prefix}/tokens`, authMiddleware.isAuthorized, token)
  router.use(`${prefix}/auth`, auth)
}