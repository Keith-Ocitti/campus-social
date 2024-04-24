const mongoose = require("mongoose");

const Friends = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "Please provide friend id"],
  },
});

module.exports = mongoose.model("Friends", Friends);
