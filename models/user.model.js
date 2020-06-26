const {Schema, model} = require("mongoose");
const { String, ObjectId } = Schema.Types
const {hashPassword} = require('../utils/index')
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
        type: ObjectId,
        required: true
    }
}, { timestamps: true })

userSchema.virtual('role', {
    ref: 'Role',
    localField: 'roleId',
    foreignField: '_id',
    justOne: true
})

userSchema.pre('save',async function (next) {
    if (this.isModified('password')) {
        this.password = await hashPassword(this.password)
    }
    next()
  })


module.exports = model("User", userSchema)