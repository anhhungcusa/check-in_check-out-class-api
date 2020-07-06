const {Schema, model} = require('mongoose')
const {ObjectId} = Schema.Types

const qrSessionSchema = new Schema({
  userId: {
    type: ObjectId,
    required: true,
    index: true,
    unique: true
  }
})


module.exports = model('QRSession', qrSessionSchema)