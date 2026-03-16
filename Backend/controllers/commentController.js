const Comment = require("../models/comment");
const Post = require("../models/post");
const Profile = require("../models/profile");

// Create a comment
const createComment = async (req, res) => {
  try {
    const { content, post_id } = req.body;
    const author_id = req.user.id;

    // Check if post exists
    const post = await Post.findById(post_id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = new Comment({
      content,
      post_id,
      author_id,
    });

    await comment.save();

    // Update comment count in post
    await Post.findByIdAndUpdate(post_id, { 
      $inc: { comments_count: 1 } 
    });

    await comment.populate('author_id', 'email');

    res.status(201).json({ success: true, comment });
  } catch (error) {
    console.error("Create comment error:", error);
    res.status(500).json({ error: "Failed to create comment" });
  }
};

// Get comments for a post
const getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post_id: postId })
      .populate('author_id', 'email')
      .sort({ createdAt: -1 })
      .lean();

    // Get author profiles for each comment
    const commentsWithProfiles = await Promise.all(
      comments.map(async (comment) => {
        const profile = await Profile.findOne({ user_id: comment.author_id._id });
        return {
          ...comment,
          profiles: profile ? {
            full_name: profile.full_name,
            avatar_url: profile.avatar_url,
          } : null,
        };
      })
    );

    res.status(200).json({ success: true, comments: commentsWithProfiles });
  } catch (error) {
    console.error("Get comments error:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

// Update a comment
const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if user is the author
    if (comment.author_id.toString() !== userId) {
      return res.status(403).json({ error: "Not authorized to update this comment" });
    }

    comment.content = content;
    await comment.save();

    res.status(200).json({ success: true, comment });
  } catch (error) {
    console.error("Update comment error:", error);
    res.status(500).json({ error: "Failed to update comment" });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if user is the author
    if (comment.author_id.toString() !== userId) {
      return res.status(403).json({ error: "Not authorized to delete this comment" });
    }

    // Update comment count in post
    await Post.findByIdAndUpdate(comment.post_id, { 
      $inc: { comments_count: -1 } 
    });

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Delete comment error:", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};

module.exports = {
  createComment,
  getPostComments,
  updateComment,
  deleteComment,
};