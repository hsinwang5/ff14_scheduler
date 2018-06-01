const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEventRegistration(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";

  if (!Validator.isLength(data.name, { min: 3, max: 20 })) {
    errors.name = "Event name should be between 3 and 20 characters. Thanks!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
