const QRSession = require('../models/qr_session.model')
const { Types: { ObjectId } } = require('mongoose')
const { statusCodes } = require('../config/globals')
const { Exception } = require('../utils')
const CheckInCheckOut = require('../models/checkin_checkout.model')
const Session = require('../models/session.model')
const checking = async (req, res, next) => {
    try {
        const { auth: { _id: userId }, body } = req
        const { codeId, sessionId } = body
        const _id = ObjectId(codeId)
        let message
        const isExistedCode = await QRSession.exists({ _id })
        // check qr is used
        if (isExistedCode) throw new Exception('QR Code is used')

        const session = await Session.findById(sessionId).populate('room')
        if (!session) throw new Exception('session not found', statusCodes.NOT_FOUND)

        const [checkedSession, checkin_checkout] = await Promise.all([
            QRSession.findOne({ userId }),
            CheckInCheckOut.findOne({ userId, sessionId })
        ])

        // check user is checked in or checkout this session
        if (checkin_checkout) {
            // check user is checked out 
            if (checkin_checkout.checkoutAt) throw new Exception('You are checked out this session')
            checkin_checkout.checkoutAt = new Date()
            await checkin_checkout.save()
            message = 'You are check-out success '
        } else {
            const checkin = new CheckInCheckOut({ userId, sessionId, checkinAt: new Date() })
            await checkin.save()
            message = 'You are check-in success '
        }
        // check user is checked qr code
        if (checkedSession) {
            checkedSession.deleteOne()
        } else {
            const qrSession = new QRSession({ _id, sessionId, userId })
            qrSession.save()
        }
        const roomName = session.room ? session.room.name : 'not found'
        res.status(statusCodes.OK).send({ message, session: { name: session.name, room: session.room && roomName } })
    } catch (error) {
        next(error)
    }

}

const getCheckin_checkouts = async (req, res, next) => {
    try {
        const { id } = req.params;
        if(!id) throw new Exception("Id is require!") 
        const checks = await CheckInCheckOut.find({ sessionId: id })
        if(!checks) throw new Exception("Not found!")
        return res.status(statusCodes.OK).send({ checkins, message : "Get Checkin_checkouts Success!" })
    } catch(error){
        next(error)
    }
}

module.exports = {
    checking,
    getCheckin_checkouts
}