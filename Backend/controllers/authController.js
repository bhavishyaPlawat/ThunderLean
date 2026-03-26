const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/user");
const { sendOtpEmail } = require("../services/emailService");

const SALT_ROUNDS = 10;

// Helper to create a user object without the password
const toUserDTO = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
  };
};

/**
 * Handles user registration.
 * Expects 'name', 'email', and 'password' in the request body.
 */
exports.signup = async (req, res) => {
  try {
    // **THE FIX IS HERE: Now correctly expects 'email' for signup**
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Create JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "72h", // Token expires in 72 hours
    });

    res.status(201).json({
      message: "User registered successfully!",
      token,
      user: toUserDTO(user),
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error during sign up." });
  }
};

/**
 * Handles user login.
 * Expects 'email' and 'password' or 'identifier' (which can be email or phone) and 'password'.
 */
exports.login = async (req, res) => {
  try {
    const { identifier, email, password } = req.body;
    const loginField = email || identifier;

    if (!loginField || !password) {
      return res
        .status(400)
        .json({ message: "Email/phone and password are required." });
    }

    const user = await User.findOne({
      $or: [{ email: loginField }, { phone: loginField }],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Create JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({
      message: "Login successful!",
      token,
      user: toUserDTO(user),
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
};

// --- (forgotPassword and loginWithOtp functions remain the same) ---
exports.forgotPassword = async (req, res) => {
  try {
    const { identifier } = req.body;

    if (!identifier) {
      return res
        .status(400)
        .json({ message: "Email or phone number is required." });
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
    await user.save();

    if (user.email) {
      await sendOtpEmail(user.email, otp);
    } else if (user.phone) {
      console.log(`Sending OTP ${otp} to phone number ${user.phone} (mocked).`);
    }

    res
      .status(200)
      .json({ message: "OTP has been sent to your registered email/phone." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error during forgot password process." });
  }
};

exports.loginWithOtp = async (req, res) => {
  try {
    const { identifier, otp } = req.body;

    if (!identifier || !otp) {
      return res
        .status(400)
        .json({ message: "Identifier and OTP are required." });
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.otp !== otp || Date.now() > user.otpExpires) {
      return res.status(401).json({ message: "Invalid or expired OTP." });
    }

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res
      .status(200)
      .json({ message: "OTP login successful!", userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during OTP login." });
  }
};

// JWT verification middleware
exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "Access token required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

// Get current user
exports.getMe = async (req, res) => {
  try {
    res.status(200).json({ 
      success: true,
      user: toUserDTO(req.user) 
    });
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Google OAuth Sign-In
exports.signInWithGoogle = async (req, res) => {
  try {
    console.log("Google Sign-In request received");
    console.log("Request body:", req.body);
    
    const { token } = req.body;

    if (!token) {
      console.log("No token provided");
      return res.status(400).json({ message: "Google token is required." });
    }

    console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
    console.log("JWT Secret available:", !!process.env.JWT_SECRET);

    if (!process.env.GOOGLE_CLIENT_ID) {
      console.log("GOOGLE_CLIENT_ID not set in environment");
      return res.status(500).json({ message: "Google OAuth not configured on server." });
    }

    if (!process.env.JWT_SECRET) {
      console.log("JWT_SECRET not set in environment");
      return res.status(500).json({ message: "JWT secret not configured on server." });
    }

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    
    console.log("Verifying Google token...");
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log("Google payload:", payload);
    const { sub: googleId, email, name, picture } = payload;

    // Check if user exists with this Google ID
    let user = await User.findOne({ googleId });
    console.log("User found by Google ID:", !!user);

    if (!user) {
      // Check if user exists with this email
      user = await User.findOne({ email });
      console.log("User found by email:", !!user);
      
      if (user) {
        // Link Google account to existing user
        user.googleId = googleId;
        await user.save();
        console.log("Linked Google account to existing user");
      } else {
        // Create new user
        user = new User({
          name,
          email,
          googleId,
          // No password for Google OAuth users
        });
        await user.save();
        console.log("Created new user with Google account");
      }
    }

    // Create JWT
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    console.log("Google Sign-In successful for user:", user._id);
    res.status(200).json({
      message: "Google Sign-In successful!",
      token: jwtToken,
      user: toUserDTO(user),
    });
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    console.error("Error details:", error.message);
    console.error("Error stack:", error.stack);
    res.status(500).json({ 
      message: "Server error during Google Sign-In.",
      error: error.message 
    });
  }
};
