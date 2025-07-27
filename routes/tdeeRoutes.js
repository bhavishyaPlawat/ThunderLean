const express = require("express");
const router = express.Router();
const { calculateTDEE } = require("../controllers/tdeeController");

router.post("/calculate", calculateTDEE);

module.exports = router;
