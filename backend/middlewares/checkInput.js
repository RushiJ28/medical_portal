const returnStatus = require("../helpers/returnStatus");

function checkIDNumber(req, res, next) {
  const { idnumber } = req.body;
  if (!idnumber) {
    returnStatus(res, 400, true, "idnumber field is missing");
    return next(new Error("idnumber field is missing"));
  }

  //Check if the idnumber only constains number and its must have 8 digits assuming the idnumber of a citizen has 8 digits
  const idnumberRegex = /^\d{8}$/;

  const result = idnumberRegex.test(idnumber);

  if (!result) {
    returnStatus(res, 400, true, "id number is invalid");
    return next(new Error("id number is invalid"));
  }
  next();
}

function checkUserName(req, res, next) {
  const { username } = req.body;
  if (!username) {
    returnStatus(res, 400, true, "username field is missing");
    return next(new Error("username field is missing"));
  }

  //Check if the username length is within the limit
  if (username.length > 15) {
    returnStatus(res, 400, true, "username is too long");
    return next(new Error("username is too long"));
  }

  //Check if the username only contains characters between 'a-z' or 'A-Z'
  const usernameRegex = /^[a-zA-Z\s]+$/;

  //check if the username matches the regular expression
  const result = usernameRegex.test(username);

  if (!result) {
    returnStatus(res, 400, true, "username is invalid");
    return next(new Error("username is invalid"));
  }
  next();
}

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

function checkAddress(req, res, next) {
  const { address } = req.body;

  if (!address) {
    returnStatus(res, 400, true, "Address is missing");
    return next(new Error("Address is missing"));
  }

  if (address.length > 100) {
    returnStatus(res, 400, true, "Address is too long");
    return next(new Error("Address is too long"));
  }

  const addressRegex = /^[a-zA-Z0-9\s.,\/'-]+$/;

  const result = addressRegex.test(address);

  if (!result) {
    returnStatus(res, 400, true, "Address is Invalid");
    return next(new Error("Address is Invalid"));
  }
  next();
}

function checkPhoneNumber(req, res, next) {
  const { phone } = req.body;

  if (!phone) {
    returnStatus(res, 400, true, "Phone is missing");
    return next(new Error("Phone is missing"));
  }

  if (phone.length > 17) {
    returnStatus(res, 400, true, "Phone is too long");
    return next(new Error("Phone is too long"));
  }

  const phoneRegex = /^[0-9 ()+-]+$/;
  const result = phoneRegex.test(phone);

  if (!result) {
    returnStatus(res, 400, true, "Phone is Invalid");
    return next(new Error("Phone is Invalid"));
  }
  next();
}

module.exports = {
  checkIDNumber,
  checkUserName,
  checkPassword,
  checkEmail,
  checkAddress,
  checkPhoneNumber,
};
