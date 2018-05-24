const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

//trim deletes preceding/trailing spaces so that empty spacebar names
//cannot be submitted
module.exports = isEmpty;
