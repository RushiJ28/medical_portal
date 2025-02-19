const express = require("express");

const router = express.Router();

router.post("/signin", (req, res) => {
  console.log("from backend");
});

module.exports = router;
