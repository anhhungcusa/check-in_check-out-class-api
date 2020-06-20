const {Schema, model} = require("mongoose");
const { String, ObjectId } = Schema.Types

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 30,
        minlength: 3
    },
    permissionIds: {
        type: ObjectId,
        ref: 'Permission',
        required: true,
        index: true
    }
}, { timestamps: true })

module.exports = model("Role", roleSchema)