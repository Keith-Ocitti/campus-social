const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please provide event title"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Please provide event description"],
  },
  location: {
    type: String,
    trim: true,
    required: [true, "Please provide event location"],
  },
  date: {
    type: String,
    trim: true,
    required: [true, "provide data"],
  },
  activityTime: {
    type: String,
    trim: true,
    required: [true, "Provide time"],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user id"],
  },
});

module.exports = mongoose.model("Events", EventSchema);
