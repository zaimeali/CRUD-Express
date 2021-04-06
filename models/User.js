const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    gender: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
