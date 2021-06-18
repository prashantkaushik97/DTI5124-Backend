const express = require("express");
const { signup, signin } = require("../../controller/admin/auth");
const { check } = require("express-validator");
var router = express.Router();
const User = require("../../models/user");
const {
  validateSignUpRequest,
  isRequestValidated,
  validateSignInRequest,
} = require("../../validators/auth");
const { requireSignIn } = require("../../common-middleware");
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/adminsignin", validateSignInRequest, isRequestValidated, signin);
router.post("/adminsignup", validateSignUpRequest, isRequestValidated, signup);
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
