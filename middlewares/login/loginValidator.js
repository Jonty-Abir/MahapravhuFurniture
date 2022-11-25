const createError = require("http-errors");
const { check, validationResult } = require("express-validator");
const loginValidator = [
  check("email")
    .isLength({ min: 1 })
    .withMessage("Invalid Credentials! try again"),
  check("password")
    .isLength({ min: 1 })
    .withMessage("Invalid Credentials! try again")
    .isLength({ min: 8 })
    .withMessage("Invalid Credentials! try again"),
  check("check").custom(async (check) => {
    try {
      if (check !== "true") {
        throw createError("Invalid Credentials! try again");
      }
    } catch (err) {
      throw createError(err.message);
    }
  }),
];
const loginValidatorHandler = async (req, res, next) => {
  const errors = validationResult(req);
  const maptedError = errors.mapped();
  if (Object.keys(maptedError).length === 0) {
    next();
  } else {
    res.status(500).json({
      errors: {
        msg: maptedError,
      },
    });
  }
};
module.exports = { loginValidator, loginValidatorHandler };
