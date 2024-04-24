const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    trim: true,
    required: [true, "Please add a room"],
  },
});

module.exports = mongoose.model("Room", RoomSchema);
