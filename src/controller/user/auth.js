const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.userSignUp = (req, res) => {
  // const errors = validationResult(req);
  // return res.status(400).json({ error: errors.array() });
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already exists",
      });
    const { firstName, lastName, email, password, role, username } = req.body;

    if (role=='admin')
      return res.status(400).json({
        message: "Can not create an admin here.",
      });
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username,
      role,
    });
    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
      if (data) {
        return res.status(201).json({
          message: "User created succesfully",
        });
      }
    });
  });
};
exports.userSignIn = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) {
      return res.status(400).json({
        error,
      });
    }
    if (user) {
      const validPassword = await bcrypt.compare(req.body.password, user.hash_password);

      if (validPassword && user.role === "user") {
        const token = jwt.sign({ _id: user._id, role: user.role }, "mern", {
          expiresIn: "1h",
        });
        const { _id, firstName, lastName, email, role, fullName, username } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
            username
          },
        });
      } else if (user.role != "user") {
        res.status(400).json({
          message: "Access Denied",
        });
      } else {
        res.status(400).json({
          message: "Invalid email/username or password",
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid email/username or password",
      });
    }
  });
};
