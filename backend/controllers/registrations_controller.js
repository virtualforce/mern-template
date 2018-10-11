const bcrypt = require("bcryptjs");

const User = require("../models/User");
const validateSignup = require("../validations/signup");
const generateBearer = require("./common_controller");

exports.create = (req, res) => {
  const { errors, isValid } = validateSignup(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email has already been taken!";
      return res.status(400).json(errors);
    }
    const newUser = new User({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then(createdUser =>
          generateBearer(createdUser, res, "Signed up successfully!")
        )
        .catch(err => res.status(400).json(err));
    });
  });
};
