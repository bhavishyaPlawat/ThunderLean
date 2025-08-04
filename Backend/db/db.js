const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Successfully connected to MongoDB."))
    .catch((err) => {
      console.error("Database connection error:", err);
      process.exit(1);
    });
}

module.exports = connectToDB;
