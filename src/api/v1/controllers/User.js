//---------Third party libraries and modules-------
const bcrypt = require("bcrypt");

//-----Custom libraries and module--------------
const { UserModel } = require("../models");
const { GenerateTokens } = require("../helpers");

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

  try {
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

//----------Controller function to login a user-----------
const LoginUser = async (req, res) => {
  //Request  body
  const { emailAddress, password } = req.body;

  try {
    //Check if email already exists
    const user = await UserModel.findOne({ emailAddress }).exec();
    if (!user) {
      return res.status(401).json({
        status: false,
        error: { message: "Wrong email address!" },
      });
    }

    //Check if password matches
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.status(401).json({
        status: false,
        error: { message: "Wrong password!" },
      });
    }

    //Genarate the access token
    const { accessToken } = GenerateTokens(user);

    return res.status(200).json({
      status: true,
      accessToken,
      success: { message: "Successfully logged in the user!" },
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      error: { message: "Failed to login the user!" },
    });
  }
};

//---------- Controller function to get user information by id--------
const GetUserById = async (req, res) => {
  //Request parameters
  const { userId } = req.params;

  try {
    const user = await UserModel.findOne({ _id: userId }).exec();
    if (!user) {
      return res.status(404).json({
        status: false,
        success: { message: "No user exists for the provided id!" },
      });
    }

    return res.status(200).json({
      status: true,
      user,

      success: { message: "Successfully fetched the user!" },
    });
  } catch (err) {
    return res.status(500).json({
      status: true,
      success: { message: "Failed to fetch the user!" },
    });
  }
};
module.exports = {
  UserRegister,
  LoginUser,
  GetUserById,
};
