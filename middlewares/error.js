const ErrorResponse = require("../utils/ErrorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (err.name === "CastError") {
    const message = `Resource not found!`;
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Server error",
  });
};

module.exports = errorHandler;
