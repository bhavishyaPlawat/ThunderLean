const Like = require("../models/like");
const Post = require("../models/post");

// Toggle like on a post
const toggleLike = async (req, res) => {
  try {
    const { post_id } = req.body;
    const user_id = req.user.id;

    // Check if post exists
    const post = await Post.findById(post_id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if user already liked the post
    const existingLike = await Like.findOne({ post_id, user_id });

    if (existingLike) {
      // Unlike the post
      await Like.findByIdAndDelete(existingLike._id);
      await Post.findByIdAndUpdate(post_id, { 
        $inc: { likes_count: -1 } 
      });
      
      res.status(200).json({ 
        success: true, 
        action: "unliked",
        message: "Post unliked successfully" 
      });
    } else {
      // Like the post
      const like = new Like({ post_id, user_id });
      await like.save();
      
      await Post.findByIdAndUpdate(post_id, { 
        $inc: { likes_count: 1 } 
      });

      res.status(201).json({ 
        success: true, 
        action: "liked",
        message: "Post liked successfully",
        like 
      });
    }
  } catch (error) {
    console.error("Toggle like error:", error);
    res.status(500).json({ error: "Failed to toggle like" });
  }
};

// Get likes for a post
const getPostLikes = async (req, res) => {
  try {
    const { postId } = req.params;

    const likes = await Like.find({ post_id: postId })
      .populate('user_id', 'email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, likes });
  } catch (error) {
    console.error("Get likes error:", error);
    res.status(500).json({ error: "Failed to fetch likes" });
  }
};

// Check if user liked a post
const checkUserLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const like = await Like.findOne({ post_id: postId, user_id: userId });

    res.status(200).json({ 
      success: true, 
      liked: !!like,
      like: like || null 
    });
  } catch (error) {
    console.error("Check user like error:", error);
    res.status(500).json({ error: "Failed to check like status" });
  }
};

module.exports = {
  toggleLike,
  getPostLikes,
  checkUserLike,
};