const jwt = require("jsonwebtoken");

const Decoder = async (tokenString) => {
  try {
    if (!tokenString || !tokenString.startsWith("Bearer ")) {
      console.log("Wrong or no token String");
    }
    const token = tokenString.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload;
  } catch (error) {
    console.log(error);
  }
};

module.exports = Decoder;
