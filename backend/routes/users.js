const express = require("express");
const usersController = require("../controllers/usersController");

const router = express.Router();

router.post("/signin", usersController.signIn);

module.exports = router;
