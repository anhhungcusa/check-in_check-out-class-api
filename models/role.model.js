const {Schema, model} = require("mongoose");
const { String, ObjectId } = Schema.Types

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 30,
        minlength: 3,
        lowercase: true
    },
    permissionIds: {
        type: [ObjectId],
        required: true,
        default: []
    }
}, { timestamps: true })

module.exports = model("Role", roleSchema)