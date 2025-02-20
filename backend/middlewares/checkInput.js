const returnStatus = require("../helpers/returnStatus");

function checkPassword(req, res, next) {
  const { password } = req.body;

  if (!password) {
    returnStatus(res, 400, true, "Password is missing");
    return next(new Error("Password is missing"));
  }

  if (password.length > 20) {
    returnStatus(
      res,
      400,
      true,
      "Password is too long, max 20 char is allowed"
    );
    return next(new Error("Password is too long, max 20 char is allowed"));
  }

  next();
}

function checkEmail(req, res, next) {
  const { email } = req.body;

  //Check if email is present or not
  if (!email) {
    returnStatus(res, 400, true, "Email is missing");
    return next(new Error("Email is missing"));
  }

  //Check if email length does not exceed 50 characters
  if (email.length > 50) {
    returnStatus(res, 400, true, "Email is too long");
    return next(new Error("Email is too long"));
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //this will either return true or false for the email if it is not valid according to the emailRegex condition
  const result = emailRegex.test(email);
  if (!result) {
    returnStatus(res, 400, true, "Email is Invalid");
    return next(new Error("Email is Invalid"));
  }
  next();
}

module.exports = { checkEmail, checkPassword };
