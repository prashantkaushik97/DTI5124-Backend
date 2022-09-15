const User = require("../../models/user");
const jwt = require("jsonwebtoken");
exports.userSignUp = (req, res) => {
  // const errors = validationResult(req);
  // return res.status(400).json({ error: errors.array() });
  User.findOne({ email: req.body.email }).exec((errir, user) => {
    if (user)
      return res.status(400).json({
        message: "User already exists",
      });
    const { firstName, lastName, email, password, role } = req.body;

    if (role=='admin')
      return res.status(400).json({
        message: "Can not create an admin here.",
      });
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
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
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) {
      return res.status(400).json({
        error,
      });
    }
    if (user) {
      if (user.authenticate(req.body.password) && user.role === "user") {
        const token = jwt.sign({ _id: user._id, role: user.role }, "mern", {
          expiresIn: "1h",
        });
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else if (user.role != "admin") {
        res.status(400).json({
          message: "Access Denied",
        });
      } else {
        res.status(400).json({
          message: "Invalid password",
        });
      }
    } else {
      res.status(400).json({
        message: "something went wrong ",
      });
    }
  });
};
