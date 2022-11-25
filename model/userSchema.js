const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "username is required*"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required*"],
      trim: true,
    },
    number: {
      type: String,
      required: [true, "number is required*"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required*"],
      trim: true,
    },
    avatar: {
      type: String,
      // required: [true, "profile picture is required*"],
      trim: true,
    },
    permission: {
      type: Boolean,
      enum: [true, false],
      required: [true, "theme & condition required*"],
    },
  },
  {
    timestamps: true,
  }
);
// static methods for Email
userSchema.statics = {
  //  for number
  findByNumber: function (phoneNo) {
    return this.findOne({ number: phoneNo });
  },
};

const SignUp = mongoose.model("User", userSchema);

module.exports = { SignUp };
