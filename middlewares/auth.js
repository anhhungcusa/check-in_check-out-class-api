const { Exception } = require('../utils')
const { verifyToken } = require('../utils/jwt')
const { statusCodes } = require('../config/globals')
const {env} = require('../config/globals')
const User = require('../models/user.model')

const isAuthorized = async (req, res, next) => {
  let token = req.get('authorization')
  try {
    if (!token) throw new Exception('Token is not valid')
    if (token.indexOf('Bearer ') !== 0) {
      throw new Exception('Token is not Bearer Token')
    }
    token = token.slice(7, token.length).trimLeft()
    const decoded = await verifyToken(token, env.JWT_SECRET_KEY)
    req.auth = decoded
    next()
  } catch ({ message = 'Token is not valid' }) {
    res.status(statusCodes.UNAUTHORIZED).send({ message })
  }
}

const requireRole = (roles = []) => async (req, res, next) => {
  try {
    if (roles.length === 0) next()
    if (!req.auth) throw new Exception('request is unauthorized', statusCodes.UNAUTHORIZED)
    const user = await User.findById(req.auth._id).populate('role')
    const role = user && user.role
    const canAccess = role && roles.includes(role)
    if (!canAccess) throw new Exception('request is forbidden', statusCodes.FORBIDDEN)
    req.role = role
    next()
  } catch (error) {
    next(error)
  }
}


module.exports = {
  isAuthorized,
  requireRole
}
