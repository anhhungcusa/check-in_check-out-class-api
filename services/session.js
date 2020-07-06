const Session = require('../models/session.model')
const { Exception } = require('../utils')
const { statusCodes } = require('../config/globals')

const findSessionById = async _id => {
  const session = await Session.findById(_id).populate('room')
  if (!session) {
    throw new Exception('session not found', statusCodes.NOT_FOUND)
  }
  return session
}

module.exports = {
  findSessionById
}