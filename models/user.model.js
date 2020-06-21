const {Schema, model} = require("mongoose");
const { String, Date, Boolean } = Schema.Types

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 30,
        minlength: 2
    },
    fullname: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 2
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    roleId: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = model("User", userSchema)