const Validator = require("validator");

const isEmpty = require("./is-empty");

module.exports = validateLogin = data => {
  let errors = {};
  let email = isEmpty(data.email) ? "" : data.email;
  let password = isEmpty(data.password) ? "" : data.password;

  // Email Validations
  if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(email)) {
    errors.email = "Email is required";
  }

  // Password Validations

  if (Validator.isEmpty(password)) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
