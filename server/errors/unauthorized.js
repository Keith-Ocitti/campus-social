const CustomAPI = require("./error");
const Unauthenticated = require("./unauthenticated");

class Unauthorized extends CustomAPI {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = Unauthenticated;
