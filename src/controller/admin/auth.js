const User = require("../../models/user");
const jwt = require("jsonwebtoken"); 
const bcrypt = require("bcrypt");

exports.adminSignup = (req, res) => {
  // const errors = validationResult(req);
  // return res.status(400).json({ error: errors.array() });
  User.findOne({ email: req.body.email }).exec((errir, user) => {
    if (user)
      return res.status(400).json({
        message: "Admin already exists",
      });
    const { firstName, lastName, email, password, role, username } = req.body;
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
          message: "Admin created succesfully",
        });
      }
    });
  });
};
exports.adminSignin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async(error, user) => {
    if (error) {
      return res.status(400).json({
        error,
      });
    }
    if (user) {
      const validPassword = await bcrypt.compare(req.body.password, user.hash_password);

      if (validPassword && user.role === "admin") {
        const token = jwt.sign({ _id: user._id }, "mern", { expiresIn: "1h" });
        const { _id, firstName, lastName, email, role, fullName,username } = user;
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
      res.status(401).json({
        message: "User doesnt exist",
      });
    }
  });
};
