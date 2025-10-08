// app.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const tdeeRoutes = require("./routes/tdeeRoutes");
const calorieRoutes = require("./routes/aiCalorieRoutes");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const likeRoutes = require("./routes/likeRoutes");
const connectToDB = require("./db/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
connectToDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/tdee", tdeeRoutes);
app.use("/api/ai", calorieRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("NutriZap Backend is running ✅");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
