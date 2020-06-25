const { Schema, model } = require("mongoose");
const { String } = Schema.Types;

const permissionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 30,
      minlength: 3,
      lowercase: true
    },
  },
  { timestamps: true }
);

module.exports = model("Permission", permissionSchema);
