const Post = require("../models/post");
const Like = require("../models/like");
const Comment = require("../models/comment");
const Profile = require("../models/profile");

// Create a new post
const createPost = async (req, res) => {
  try {
    const { title, content, image_url } = req.body;
    const author_id = req.user.id;

    const post = new Post({
      title,
      content,
      author_id,
      image_url,
    });

    await post.save();
    
    // Populate author profile for response
    await post.populate('author_id', 'email');
    
    res.status(201).json({ success: true, post });
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
};

// Get all posts with author info, likes, and comments
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author_id', 'email')
      .sort({ createdAt: -1 })
      .lean();

    // Get author profiles, likes, and comments for each post
    const postsWithDetails = await Promise.all(
      posts.map(async (post) => {
        const profile = await Profile.findOne({ user_id: post.author_id._id });
        const likes = await Like.find({ post_id: post._id });
        const comments = await Comment.find({ post_id: post._id }).countDocuments();
        
        return {
          ...post,
          profiles: profile ? {
            full_name: profile.full_name,
            avatar_url: profile.avatar_url,
          } : null,
          likes: likes.map(like => ({ user_id: like.user_id })),
          comments: [{ id: comments }], // Format to match Supabase structure
        };
      })
    );

    res.status(200).json({ success: true, posts: postsWithDetails });
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

// Get a single post
const getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate('author_id', 'email');

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ success: true, post });
  } catch (error) {
    console.error("Get post error:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
};

// Update a post
const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content, image_url } = req.body;
    const userId = req.user.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if user is the author
    if (post.author_id.toString() !== userId) {
      return res.status(403).json({ error: "Not authorized to update this post" });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.image_url = image_url || post.image_url;

    await post.save();

    res.status(200).json({ success: true, post });
  } catch (error) {
    console.error("Update post error:", error);
    res.status(500).json({ error: "Failed to update post" });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if user is the author
    if (post.author_id.toString() !== userId) {
      return res.status(403).json({ error: "Not authorized to delete this post" });
    }

    // Delete associated likes and comments
    await Like.deleteMany({ post_id: postId });
    await Comment.deleteMany({ post_id: postId });
    
    await Post.findByIdAndDelete(postId);

    res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
};