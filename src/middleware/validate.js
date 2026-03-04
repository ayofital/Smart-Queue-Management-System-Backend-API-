import { validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "Failed",
      message: errors
        .array()
        .map((err) => err.msg)
        .join(" ~ "),
    });
  }
  next();
};

export default validate;
