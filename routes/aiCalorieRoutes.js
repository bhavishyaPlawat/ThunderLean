const express = require("express");
const router = express.Router();
const { analyzeMeal } = require("../controllers/aicalorieController");

router.post("/analyze-meal", analyzeMeal);

module.exports = router;
