const express = require("express");
const {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const { verifyToken } = require("../controllers/authController");

const router = express.Router();

// Protected routes (require authentication)
router.post("/", verifyToken, createPost);
router.get("/", verifyToken, getAllPosts);
router.get("/:postId", verifyToken, getPost);
router.put("/:postId", verifyToken, updatePost);
router.delete("/:postId", verifyToken, deletePost);

module.exports = router;