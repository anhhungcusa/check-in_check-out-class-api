const Role = require('../models/role.model')
const { statusCodes } = require('../config/globals')
const { Exception } = require('../utils')

const getRoles = async (req, res, next) => {
  try {
    const roles = await Role.find()
    if (!roles) {
      throw new Exception('Don\'t have a room')
    }
    
    return res
      .status(statusCodes.OK)
      .json({ roles,
        message: 'Get Roles Success!' })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getRoles,
}
