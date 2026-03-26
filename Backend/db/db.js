const mongoose = require("mongoose");

function connectToDB() {
  console.log('MongoDB URI:', process.env.MONGO_URI); // Move inside the function
  
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not defined in environment variables');
    process.exit(1);
  }
  
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Successfully connected to MongoDB."))
    .catch((err) => {
      console.error("Database connection error:", err);
      process.exit(1);
    });
}

module.exports = connectToDB;