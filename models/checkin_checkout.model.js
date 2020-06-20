const { Schema, model } = require("mongoose");
const {  ObjectId, Date } = Schema.Types;

const checkin_checkoutSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    sessionId: {
      type: ObjectId,
      ref: "Session",
      required: true,
      index: true,
    },
    checkinAt: {
      type: Date,
      required: true,
    },
    checkoutAt: {
      type: Date,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = model("Checkin_checkout", checkin_checkoutSchema);
