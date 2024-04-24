const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      trim: true,
      required: [true, "Please provide body"],
    },
    room: {
      type: mongoose.Types.ObjectId,
      trim: true,
      required: [true, "Please enter a room id"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
