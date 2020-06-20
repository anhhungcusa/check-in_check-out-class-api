const { Schema, model } = require("mongoose");
const { String } = Schema.Types;

const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 30,
      minlength: 3,
    },
  },
  { timestamps: true }
);

module.exports = model("Permission", roomSchema);
