//---------Third party libraries and modules-------
const bcrypt = require("bcrypt");

//-----Custom libraries and module--------------
const { UserModel } = require("../models");

//-----Controller functions--------------
//User registration
const UserRegister = async (req, res) => {
  //   console.log(req.body);
  //Request body
  const {
    fullName,
    emailAddress,
    password,
    phoneNumber,
    gender,
    userType,
    dateCreated,
    timeCreated,
  } = req.body;

  //check if email or phone number already exists
  const user = await UserModel.findOne({
    $or: [{ emailAddress }, { phoneNumber }],
  }).exec();

  if (user !== null) {
    return res.json({
      status: false,
      error: {
        message: "Email  or phone number already exist!",
      },
    });
  }

  //Password hashing
  const hashedPassword = await bcrypt.hash(password, 8);

  //New user
  const newUSer = new UserModel({
    fullName,
    emailAddress,
    password: hashedPassword,
    phoneNumber,
    gender,
    userType,
    dateCreated,
    timeCreated,
  });

  try {
    const savedUser = await newUSer.save();
    return res.status(201).json({
      status: true,
      user: savedUser,
      success: {
        message: "Successfully registered a new user!",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: {
        message: "Failed to register a new user!",
      },
    });
  }
};

module.exports = {
  UserRegister,
};
