const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, { authSource: "admin" });
};

module.exports = connectDB;
