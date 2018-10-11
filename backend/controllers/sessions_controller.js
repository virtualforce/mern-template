const bcrypt = require("bcryptjs");

const validateLogin = require("../validations/login");
const generateBearer = require("./common_controller");

exports.create = (req, res) => {
  let invalidLogin = "Invalid Email or Password!";
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      res.status(404).json({ error: invalidLogin });
    }
    bcrypt.compare(req.body.password, user.password).then(matched => {
      if (matched) {
        generateBearer(user, res, "Logged in successfully!");
      } else {
        res.status(400).json({ message: invalidLogin });
      }
    });
  });
};
