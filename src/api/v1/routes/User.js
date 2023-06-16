//---------Third-party libraries & modules------------

const express = require("express");

//-------------Custom libraries & modules---------------
const { UserRegister } = require("../controllers");

//Initialize the router
const router = express.Router();

//user registration
router.post("/register", UserRegister);

module.exports = router;
