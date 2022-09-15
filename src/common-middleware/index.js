const jwt = require("jsonwebtoken");
const User = require("../models/user");
//const User = require(".././models/user");
exports.requireSignIn = (req, res, next) => {
  if (req.headers.autherization === null) {
    return res.status(400).json({ message: "Authorization required" });
  }
  const token = req.headers.autherization;
  const user = jwt.verify(token, "mern");
  req.user = user;
  next();
};
exports.userMiddleware = (req, res, next) => {
  if (req.user._id) {
    User.findOne({ _id: req.user._id }).exec((error, user) => {
      if (error || user.role !== "user") {
        return res
          .status(400)
          .json({ message: "Only user can acces this area" });
      }
    });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user._id) {
    User.findOne({ _id: req.user._id }).exec((error, user) => {
      if (error || user.role !== "admin") {
        return res
          .status(400)
          .json({ message: "Only admin can acces this area" });
      }
    });
  }
  next();
};
