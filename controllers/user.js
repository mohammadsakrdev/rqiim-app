const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.register = (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  });

  newUser.save((err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        success: false,
        message: "Failed to save the user",
        data: null
      });
    }
    res.status(200).json({
      message: "User Saved",
      data: user
    });
  });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email })
    .then(user => {
      // Check for user
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User Matched
          const payload = { id: user.id, name: user.name, role: user.role }; // Create JWT Payload

          // Sign Token
          jwt.sign(
            payload,
            process.env.SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.current = (req, res, next) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role
  });
};
