const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateMemberRegistration(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.username, { min: 3, max: 14 })) {
    errors.username =
      "User name should be between 3 and 14 characters. Thanks!";
  }
  if (
    !Validator.isLength(data.password, { min: 6, max: 20 }) &&
    data.password !== ""
  ) {
    errors.password = "Password should be between 6 and 20 characters. Thanks!";
  }

  if (!Validator.isEmail(data.email) && data.email !== "") {
    errors.email = "Please enter a valid email address.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
