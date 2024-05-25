const User = require("../models/User");
const { BadRequest, Unauthenticated } = require("../errors/index");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequest("Please enter credentials");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequest(`User with email ${email} does not exist`);
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return new Unauthenticated("Invalid credentials, try again");
    }

    const token = user.createJWT();

    res.status(201).json({ user, token });

    // create a token
    // send back user data with token
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, post } = req.body;
    const user = await User.create({ ...req.body });

    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};
module.exports = { login, register };
