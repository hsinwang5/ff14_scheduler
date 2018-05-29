const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegistration(data) {
  let errors = {};

  data.groupname = !isEmpty(data.groupname) ? data.groupname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.username = !isEmpty(data.username) ? data.username : "";

  if (!Validator.isLength(data.groupname, { min: 3, max: 25 })) {
    errors.groupname =
      "Group name should be between 3 and 25 characters. Thanks!";
  }
  if (
    !Validator.isLength(data.username, { min: 3, max: 20 }) &&
    data.username !== ""
  ) {
    errors.username =
      "User name should be between 3 and 20 characters. Thanks!";
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
