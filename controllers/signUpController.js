const jwt = require("jsonwebtoken");
const { SignUp } = require("../model/userSchema");
const bcrypt = require("bcrypt");

const signUpController = async (req, res, next) => {
  let hashPassword, newUser;
  try {
    if (req.body.password.trim().length >= 8) {
      hashPassword = await bcrypt.hash(req.body.password, 10);
    }
    if (req.file) {
      const { filename } = req.file;
      newUser = new SignUp({
        ...req.body,
        password: hashPassword,
        cPassword: hashPassword,
        avatar: filename,
      });

      // save to data base
      const result = await newUser.save();
      const user = await SignUp.findOne({ email: req.body.email });
      const userObj = {
        userID: user._id,
        userName: user.username,
        email: user.email,
        avatar: user.avatar,
        mobileNo: user.number,
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
    }
  } catch (err) {
    // console.log(err.message);
    res.status(500).json({
      errors: {
        msg: err.message,
      },
    });
  }
};

module.exports = { signUpController };
