const CustomAPI = require("./error");

class Unauthenticated extends CustomAPI {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = Unauthenticated;
