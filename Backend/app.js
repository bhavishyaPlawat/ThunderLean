// app.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const tdeeRoutes = require("./routes/tdeeRoutes");
const calorieRoutes = require("./routes/aiCalorieRoutes");
const helmet = require("helmet");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/tdee", tdeeRoutes);
app.use("/api/ai", calorieRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("NutriZap Backend is running ✅");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
