const QRCodeSession = require('../models/qr_session.model')

const checkQRCodeIsUsed = async (_id) => {
  const isUsed = await QRCodeSession.exists({_id})
  return isUsed
}

const findQRCodeByUserId = async (userId) => {
  const session = await QRCodeSession.findOne({ userId })
  return session || null
}

const addNewQRCodeSession = async (sessionId, userId, _id) => {
  const qrCodeSession = new QRCodeSession({ _id, sessionId, userId })
  await qrCodeSession.save()
  return qrCodeSession
}

module.exports = {
  checkQRCodeIsUsed,
  findQRCodeByUserId,
  addNewQRCodeSession
}