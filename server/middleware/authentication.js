const jwt = require("jsonwebtoken");
const { Unauthenticated } = require("../errors/index");

const authenticationMiddleware = async function (req, res, next) {
  try {
    const token = req.headers.authorization;
    // console.log(token);
    if (!token || !token.startsWith("Bearer ")) {
      throw new Unauthenticated("No token");
    }
    const tokenString = token.split(" ")[1];
    const payload = jwt.verify(tokenString, process.env.JWT_SECRET);
    req.user = { ...payload };
    next();
  } catch (error) {
    throw new Unauthenticated("Not authenticated");
  }
};

module.exports = authenticationMiddleware;
