const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, "Please provide first name"],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Please provide last name"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Please provide password"],
    minLength: 6,
  },
  post: {
    type: String,
    trim: true,
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (input) {
  const isMatch = bcrypt.compare(input, this.password);
  return isMatch;
};

UserSchema.methods.createJWT = function () {
  const token = jwt.sign(
    { userId: this._id, name: this.firstName },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFE_TIME }
  );
  return token;
};

module.exports = mongoose.model("User", UserSchema);
