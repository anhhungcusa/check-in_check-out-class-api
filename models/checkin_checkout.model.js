const { Schema, model } = require('mongoose')
const {  ObjectId, Date } = Schema.Types

const checkinCheckoutSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    sessionId: {
      type: ObjectId,
      ref: 'Session',
      required: true,
      index: true
    },
    checkinAt: {
      type: Date,
      required: true,
    },
    checkoutAt: {
      type: Date,
    }
  },
  { timestamps: true }
)

checkinCheckoutSchema.index({userId: 1,
  sessionId: 1}, {unique: true})

module.exports = model('CheckinCheckout', checkinCheckoutSchema)
