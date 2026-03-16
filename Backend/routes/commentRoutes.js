const express = require("express");
const {
  createComment,
  getPostComments,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");
const { verifyToken } = require("../controllers/authController");

const router = express.Router();

// Protected routes (require authentication)
router.post("/", verifyToken, createComment);
router.get("/post/:postId", verifyToken, getPostComments);
router.put("/:commentId", verifyToken, updateComment);
router.delete("/:commentId", verifyToken, deleteComment);

module.exports = router;