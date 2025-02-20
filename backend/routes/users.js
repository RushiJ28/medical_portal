const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { checkEmail, checkPassword } = require("../middlewares/checkInput");

router.post("/signin", checkEmail, checkPassword, usersController.signIn);

router.use((err, req, res, next) => {
  console.log("From users route middleware", err.message);
});

module.exports = router;
