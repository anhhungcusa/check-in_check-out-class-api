const {Schema, model} = require("mongoose");
const { String, Date, ObjectId } = Schema.Types

const sessionSchema = new Schema({
    startAt: {
        type: Date,
        required: true
    },
    endAt: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 3
    },
    hostId: {
        type: ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    participantIds: {
        type: ObjectId,
        ref: 'Checkin_checkout',
        required: true,
        index: true
    },
    roomId: {
        type: ObjectId,
        ref: 'Room',
        required: true,
        index: true
    }
}, { timestamps: true })

module.exports = model("Session", sessionSchema)