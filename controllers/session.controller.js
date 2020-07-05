const Session = require('../models/session.model')
const { statusCodes } = require('../config/globals')
const { Exception } = require('../utils')

const createSession = async (req, res, next) => {
  try {
    const { startAt, endAt, name, hostId, roomId } = req.body
    // check valid
    if (!startAt || !endAt || !name || !hostId || !roomId) {
      throw new Exception('A field invalid. Please check again!')
    }

    // create session
    const session = new Session({
      startAt,
      endAt,
      name,
      hostId,
      roomId,
    })
    await session.save()
    return res
      .status(statusCodes.OK)
      .send({ session,
        message: 'Create Session Success!' })
  } catch (err) {
    next(err)
  }
}

const getSessions = async (req, res, next) => {
  try {
    const sessions = await Session.find()
    if (!sessions) throw new Exception('Don\'t have a user')
    return res
      .status(statusCodes.OK)
      .json({ sessions,
        message: 'Get Sessions Success!' })
  } catch (err) {
    next(err)
  }
}

const getSessionById = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id) throw new Exception('Id is required!')
    const session = await Session.findById(id).populate('participantIds')
    if (!session) throw new Exception('Not Found Session')
    return res
      .status(statusCodes.OK)
      .send({ session,
        message: 'Get Session Success' })
  } catch (err) {
    next(err)
  }
}

const deleteSessionById = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id) throw new Exception('Id is required!')
    const result = await Session.findByIdAndDelete(id)
    if (!result) throw new Exception('Session Don\'t Exist!')
    return res
      .status(statusCodes.OK)
      .send({ message: `Delete Session - ${id} Success!` })
  } catch (err) {
    next(err)
  }
}

const editSessionById = async (req, res, next) => {
  try {
    const { id } = req.params
    const { startAt, endAt, name, roomId } = req.body
    if (!id) throw new Exception('Id is requireed!')
    const session = await Session.findByIdAndUpdate(
      id,
      { startAt,
        endAt,
        name,
        roomId },
      { new: true }
    )
    if (!session) throw new Exception(`Not Found Session - ${id}`)
    return res
      .status(statusCodes.OK)
      .send({ session,
        message: `Edit Session-${id} Success!` })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createSession,
  getSessions,
  getSessionById,
  deleteSessionById,
  editSessionById,
}
