const mongoose = require("mongoose");

const messsageSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      trim: true,
    },
    to: {
      type: mongoose.Types.ObjectId,
      trim: true,
      ref: "User",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messsageSchema);
