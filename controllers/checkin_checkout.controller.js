const { QRCodeSessionService, SessionService, CheckInCheckOutService } = require('../services')
const { statusCodes } = require('../config/globals')
const { Exception } = require('../utils')
const CheckInCheckOut = require('../models/checkin_checkout.model')
const { socketConnections } = require('../constants/index')

const checking = async (req, res, next) => {
  try {
    const {
      auth: { _id: userId },
      body,
      io,
    } = req
    const { codeId, sessionId } = body
    // check qr is used
    const isUsed = await QRCodeSessionService.checkQRCodeIsUsed(codeId)
    if (isUsed) throw new Exception('QR Code is used')
    // find session
    const session = await SessionService.findSessionById(sessionId)
    // check
    const [checkedSession, checkStatusMessage] = await Promise.all([
      QRCodeSessionService.findQRCodeByUserId(userId),
      // check status user in this session
      CheckInCheckOutService.checkUserStatusInSession(userId, sessionId),
    ])
    // check user is checked qr code
    if (checkedSession) checkedSession.deleteOne()
    else QRCodeSessionService.addNewQRCodeSession(sessionId, userId, codeId)
    
    // send event to change qr code with socket
    if (io) {
      io.emit(socketConnections.qrSession, sessionId)
    }
    const roomName = session.room ? session.room.name : 'not found'
    res.status(statusCodes.OK).send({
      message: checkStatusMessage,
      session: { name: session.name, room: session.room && roomName },
    })
  } catch (error) {
    next(error)
  }
}

const getCheckinCheckouts = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id) throw new Exception('Id is require!')
    const checkins = await CheckInCheckOut.find({ sessionId: id })
    if (!checkins) throw new Exception('Not found!')
    return res
      .status(statusCodes.OK)
      .send({ checkins, message: 'Get Checkin_checkouts Success!' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  checking,
  getCheckinCheckouts,
}
