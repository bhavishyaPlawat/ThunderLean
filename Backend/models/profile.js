const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    full_name: {
      type: String,
      required: true,
      trim: true,
    },
    avatar_url: {
      type: String,
      default: null,
    },
    age: {
      type: Number,
      min: 1,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    height: {
      type: Number, // in cm
      min: 1,
    },
    weight: {
      type: Number, // in kg
      min: 1,
    },
    activity_level: {
      type: String,
      enum: ["sedentary", "lightly_active", "moderately_active", "very_active", "extremely_active"],
    },
    goal: {
      type: String,
      enum: ["lose_weight", "maintain_weight", "gain_weight"],
    },
    bio: {
      type: String,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;