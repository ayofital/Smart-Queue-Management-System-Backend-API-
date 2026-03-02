const errorHandler = (err, req, res, next) => {
  console.error(err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Duplicate Key Error
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue[0]);
    message = `${field} already exists.`;
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.error)
      .map((error) => error.message)
      .join(", ");
  }

  // CastError (invalid ObjectId)
  if ((err.name === "CastError")) {
    statusCode = 401;
    message = "Invalid ID format";
  }

  // JWT Errors
  if ((err.name === "JsonWebTokenError")) {
    statusCode = 401;
    message = "Invalid Token";
  }

  if ((err.name === "TokenExpiredError")) {
    statusCode = 401;
    message = "Token Expired";
  }

  // Handle Mongoose validation errors (object form)
  // if (err.errors && typeof err.errors === "object") {
  //   message = Object.values(err.errors)
  //     .map((err) => err.message)
  //     .join(" ~ ");
  // }

  res.status(statusCode).json({ status: "Failed", message });
};;

export default errorHandler;