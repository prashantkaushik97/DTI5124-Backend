const express = require("express");
const {  adminSignup, adminSignin } = require("../controller/admin/auth");
const { userSignUp, userSignIn} = require("../controller/user/auth");

const { check } = require("express-validator");
var router = express.Router();
const User = require("../models/user");
const {
  validateSignUpRequest,
  isRequestValidated,
  validateSignInRequest,
} = require("../validators/auth");
const { requireSignIn } = require("../common-middleware");
router.post("/usersignin", validateSignInRequest, isRequestValidated,userSignIn);
router.post("/usersignup", validateSignUpRequest, isRequestValidated,userSignUp);
router.post("/adminsignin", validateSignInRequest, isRequestValidated, adminSignin);
router.post("/adminsignup", validateSignUpRequest, isRequestValidated, adminSignup);
router.post(
  "/profile",
  validateSignInRequest,
  isRequestValidated,
  requireSignIn,
  (req, res) => {
    res.status(200).json({
      user: "profile",
    });
  }
);
module.exports = router;
