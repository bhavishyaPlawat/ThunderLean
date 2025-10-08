const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  forgotPassword,
  loginWithOtp,
  verifyToken,
  getMe,
} = require("../controllers/authController");

// Define the routes and link them to the controller functions
router.post("/signup", signup);
router.post("/register", signup); // Alias for signup
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/login-otp", loginWithOtp);
router.get("/me", verifyToken, getMe);

module.exports = router;
