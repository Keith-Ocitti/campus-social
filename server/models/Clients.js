const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true,
    trim: true,
  },
  therapistId: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Clients", ClientSchema);
