const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // name: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    email: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpires: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);
// Create and export the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
