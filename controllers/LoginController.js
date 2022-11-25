const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SignUp } = require("../model/userSchema");
//
const createError = require("http-errors");
const { use } = require("../routers/router");
const loginController = async (req, res) => {
  /*****************handle cross prolesy***********************/
  try {
    const user = await SignUp.findOne({
      $or: [{ email: req.body.email }, { number: req.body.email }],
    });
    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isValidPassword) {
        const userObj = {
          userID: user._id,
          userName: user.username,
          email: user.email,
          avatar: user.avatar,
        };
        const token = await jwt.sign(userObj, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });
        res.status(200).json({
          success: {
            msg: "success",
            payload: userObj,
            decoded: token,
          },
        });
      } else {
        throw createError("Invalid Credentials! try again!");
      }
    } else {
      throw createError("Invalid Credentials! try again!");
    }
  } catch (err) {
    res.status(500).json({
      errors: {
        msg: err.message,
      },
    });
    console.log(err.message);
  }
};

module.exports = { loginController };
