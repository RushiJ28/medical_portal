const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { checkEmail, checkPassword } = require("../middlewares/checkInput");
const verifyToken = require("../middlewares/verifyToken");

router.post("/signin", checkEmail, checkPassword, usersController.signIn);

router.get("/checkifloggedin", verifyToken, usersController.checkifLoggedIn);

//This is the middleware to handle the error and it must be at the bottom
router.use((err, req, res, next) => {
  //If there is error thrown from any middlewares such as checkEmail/checkPassword ... this middleware runs and we see the error from the backend.
  console.log("From users route middleware", err.message);
});

module.exports = router;
