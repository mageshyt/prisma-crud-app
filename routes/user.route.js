const express = require("express");
const {
  signup,
  findUser,
  signIn,
  logout,
  getAllUser,
} = require("../controller/user.controller");
const router = express.Router();

router.route("/signup").post(signup);

router.route("/find").post(findUser);

router.route("/signin").post(signIn);

router.route("/logout").get(logout);

router.route("/alluser").get(getAllUser);

module.exports = { userRouter: router };
