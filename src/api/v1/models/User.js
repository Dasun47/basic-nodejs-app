//--------third-party libraries  & modules ------

const mongoose = require("mongoose");

//---------User schema-------
const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
    },
    gender: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },

    dateCreated: {
      type: String,
      required: true,
    },
    timeCreated: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
