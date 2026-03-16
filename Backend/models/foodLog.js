const mongoose = require("mongoose");

const foodLogSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    food_name: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      required: true,
      enum: ["grams", "cups", "pieces", "ml", "oz"],
    },
    calories: {
      type: Number,
      required: true,
      min: 0,
    },
    protein: {
      type: Number,
      default: 0,
      min: 0,
    },
    carbs: {
      type: Number,
      default: 0,
      min: 0,
    },
    fat: {
      type: Number,
      default: 0,
      min: 0,
    },
    meal_type: {
      type: String,
      required: true,
      enum: ["breakfast", "lunch", "dinner", "snack"],
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const FoodLog = mongoose.model("FoodLog", foodLogSchema);

module.exports = FoodLog;