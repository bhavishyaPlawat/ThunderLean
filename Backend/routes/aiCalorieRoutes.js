const express = require("express");
const router = express.Router();
const { analyzeMeal } = require("../controllers/aicalorieController");
const multer = require("multer");

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/analyze-meal", upload.single("mealImage"), analyzeMeal);

module.exports = router;
