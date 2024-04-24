const CustomAPI = require("../errors/error");

const errorHandlerMiddleware = async (err, req, res, next) => {
  if (err instanceof CustomAPI) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  return res
    .status(500)
    .json({ msg: "Internal server error, something went wrong" });
};

module.exports = errorHandlerMiddleware;
