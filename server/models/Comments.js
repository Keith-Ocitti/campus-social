const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      trim: true,
      required: [true, "Please provide comment body"],
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      required: [true, "Please provide post id"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user id"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
