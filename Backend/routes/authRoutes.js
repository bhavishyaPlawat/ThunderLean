const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  forgotPassword,
  loginWithOtp,
} = require("../controllers/authController");

// Define the routes and link them to the controller functions
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/login-otp", loginWithOtp);

module.exports = router;
