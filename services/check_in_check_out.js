const CheckInCheckOut = require('../models/checkin_checkout.model')


const checkUserStatusInSession = async (userId, sessionId) => {
  const userStatus = CheckInCheckOut.findOne({ userId, sessionId })
  if (!userStatus) {
    const status = new CheckInCheckOut({userId, sessionId, checkinAt: new Date()})
    await status.save()
    return 'you checked in successful'
  }
  if (userStatus.checkoutAt) {
    return 'You checked out this session'
  }
  userStatus.checkoutAt = new Date()
  await userStatus.save()
  return 'You checked out successful'
}

module.exports = {
  checkUserStatusInSession
}