const Profile = require("../models/profile");
const User = require("../models/user");

// Create or update user profile
const createOrUpdateProfile = async (req, res) => {
  try {
    const { 
      full_name, 
      avatar_url, 
      age, 
      gender, 
      height, 
      weight, 
      activity_level, 
      goal, 
      bio 
    } = req.body;
    
    const userId = req.user.id;

    let profile = await Profile.findOne({ user_id: userId });

    if (profile) {
      // Update existing profile
      profile.full_name = full_name || profile.full_name;
      profile.avatar_url = avatar_url || profile.avatar_url;
      profile.age = age || profile.age;
      profile.gender = gender || profile.gender;
      profile.height = height || profile.height;
      profile.weight = weight || profile.weight;
      profile.activity_level = activity_level || profile.activity_level;
      profile.goal = goal || profile.goal;
      profile.bio = bio || profile.bio;
      
      await profile.save();
    } else {
      // Create new profile
      profile = new Profile({
        user_id: userId,
        full_name,
        avatar_url,
        age,
        gender,
        height,
        weight,
        activity_level,
        goal,
        bio,
      });
      await profile.save();
    }

    res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error("Profile creation/update error:", error);
    res.status(500).json({ error: "Failed to create/update profile" });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await Profile.findOne({ user_id: userId }).populate('user_id', 'email');

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// Get profile by user ID (for other users)
const getProfileByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await Profile.findOne({ user_id: userId }).populate('user_id', 'email');

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error("Get profile by user ID error:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

module.exports = {
  createOrUpdateProfile,
  getProfile,
  getProfileByUserId,
};