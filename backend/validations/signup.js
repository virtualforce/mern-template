const Validator = require("validator");

const isEmpty = require("./is-empty");

module.exports = validateSignup = data => {
  let errors = {};
  data.email = isEmpty(data.email) ? "" : data.email;
  data.firstName = isEmpty(data.firstName) ? "" : data.firstName;
  data.lastName = isEmpty(data.lastName) ? "" : data.lastName;
  data.password = isEmpty(data.password) ? "" : data.password;

  // Email Validations
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  // Name Validations

  if (!Validator.matches(data.firstName, /^[A-Za-z]+$/)) {
    errors.firstName = "First Name must contain letters only";
  }

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First Name is required";
  }

  if (!Validator.matches(data.lastName, /^[A-Za-z]+$/)) {
    errors.lastName = "Last Name must contain letters only";
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last Name is required";
  }

  // Password Validations

  if (!Validator.isLength(data.password, { min: 8 })) {
    errors.password = "Password must contain atleast 8 characters";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = "Two passwords don't match";
  }

  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = "Password Confirmation is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
