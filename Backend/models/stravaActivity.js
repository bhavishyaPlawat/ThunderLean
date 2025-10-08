const mongoose = require("mongoose");

const stravaActivitySchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    strava_activity_id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true, // e.g., "Run", "Ride", "Swim"
    },
    distance: {
      type: Number, // in meters
      required: true,
    },
    moving_time: {
      type: Number, // in seconds
      required: true,
    },
    elapsed_time: {
      type: Number, // in seconds
      required: true,
    },
    total_elevation_gain: {
      type: Number, // in meters
      default: 0,
    },
    start_date: {
      type: Date,
      required: true,
    },
    calories: {
      type: Number,
      default: 0,
    },
    average_speed: {
      type: Number, // in m/s
      default: 0,
    },
    max_speed: {
      type: Number, // in m/s
      default: 0,
    },
  },
  { timestamps: true }
);

const StravaActivity = mongoose.model("StravaActivity", stravaActivitySchema);

module.exports = StravaActivity;