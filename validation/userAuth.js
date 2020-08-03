const Validator = require("validator");

module.exports = function validateInput(data) {
  let error = "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    error = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    error = "Email is invalid";
  } else if (Validator.isEmpty(data.password)) { // Password checks
    error = "Password field is required";
  }

  return {
    error,
    isValid: Validator.isEmpty(error) // no error means TRUE 
  };
};
