//------Third-party libraries and modules-----
const jwt = require("jsonwebtoken");

//----Custom libraries & modules---------

const Configs = require("../../../configs");

//---------Function to genarate access token-----------
const GenerateTokens = (user) => {
  try {
    //Create the payload
    const payload = { id: user._id, userType: user.userType };
    //Genarate the access token
    const accessToken = jwt.sign(payload, Configs.JWT_ACCESS_KEY, {
      expiresIn: "10m",
    });

    return { status: true, accessToken };
  } catch (err) {
    console.log(err);
    return { status: true, accessToken: null };
  }
};

//----------Function to verify the access token---------

const VerifyTokens = (token) => {
  try {
    const user = jwt.verify(token, Configs.JWT_ACCESS_KEY);
    return { status: true, tokenDetails: user };
  } catch (err) {
    console.log(err);
    return { status: false, tokenDetails: null };
  }
};

module.exports = { GenerateTokens, VerifyTokens };
