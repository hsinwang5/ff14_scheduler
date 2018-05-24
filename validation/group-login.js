const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateGroupLogin(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (
    !Validator.isLength(data.password, { min: 6, max: 20 }) &&
    data.password !== ""
  ) {
    errors.password = "Password should be between 6 and 20 characters. Thanks!";
  }

  if (!Validator.isLength(data.email, { min: 4 })) {
    errors.email = "Email field must be at least 4 characters long";
  }

  if (!Validator.isEmail(data.email) && data.email !== "") {
    errors.email = "Please enter a valid email address.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
