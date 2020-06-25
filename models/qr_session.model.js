const {Schema, model} = require('mongoose')
const {ObjectId} = Schema.Types

const qrSessionSchema = new Schema({
    sessionId: {
        type: ObjectId,
        required: true,
        index: true
    },
    userId: {
        type: ObjectId,
        required: true,
        index:true
    }
})


module.exports = model('QRSession', qrSessionSchema)