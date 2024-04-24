const CustomAPI = require("./error");

class BadRequest extends CustomAPI {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequest;
