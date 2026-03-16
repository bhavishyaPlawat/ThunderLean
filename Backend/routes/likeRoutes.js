const express = require("express");
const {
  toggleLike,
  getPostLikes,
  checkUserLike,
} = require("../controllers/likeController");
const { verifyToken } = require("../controllers/authController");

const router = express.Router();

// Protected routes (require authentication)
router.post("/toggle", verifyToken, toggleLike);
router.get("/post/:postId", verifyToken, getPostLikes);
router.get("/check/:postId", verifyToken, checkUserLike);

module.exports = router;