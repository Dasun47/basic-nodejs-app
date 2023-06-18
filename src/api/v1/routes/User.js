//---------Third-party libraries & modules------------

const express = require("express");

//-------------Custom libraries & modules---------------
const { UserRegister, LoginUser, GetUserById } = require("../controllers");
const { AuthenticateUser, AuthorizeUser } = require("../middlewares");
//Initialize the router
const router = express.Router();

//user registration
router.post("/register", UserRegister);

//Login user
router.post("/login", LoginUser);

// Get user by id
router.get(
  "/:userId",
  AuthenticateUser,
  AuthorizeUser(["member", "manager"]),
  GetUserById
);

module.exports = router;
