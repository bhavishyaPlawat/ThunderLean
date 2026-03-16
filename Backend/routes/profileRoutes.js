const express = require("express");
const {
  createOrUpdateProfile,
  getProfile,
  getProfileByUserId,
} = require("../controllers/profileController");
const { verifyToken } = require("../controllers/authController");

const router = express.Router();

// Protected routes (require authentication)
router.post("/", verifyToken, createOrUpdateProfile);
router.get("/", verifyToken, getProfile);
router.get("/:userId", verifyToken, getProfileByUserId);

module.exports = router;