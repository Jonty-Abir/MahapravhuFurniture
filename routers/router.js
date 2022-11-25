const axios = require("axios");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
// internal import's
const { signUpController } = require("../controllers/signUpController");
const { loginController } = require("../controllers/LoginController");
const { upload } = require("../utilities/fileUpload");
const {
  signUpValidatorHandler,
  signUpValidator,
} = require("../middlewares/signup/signUpValidator");
const {
  loginValidator,
  loginValidatorHandler,
} = require("../middlewares/login/loginValidator");

router.use((req, res, next) => {
  res.append("Author", "Abir");
  next();
});

/*----------Registe POST------*/
router.post(
  "/reg",
  upload.single("avatar"),
  signUpValidator,
  signUpValidatorHandler,
  signUpController
);

/*----------Login POST------*/
router.post(
  "/login",
  upload.none(),
  loginValidator,
  loginValidatorHandler,
  loginController
);

/*----------LOGOUT GET------*/

/*----------check GET------*/
router.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});

module.exports = router;
