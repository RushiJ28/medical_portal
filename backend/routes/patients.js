const express = require("express");
const router = express.Router();
const paitentsController = require("../controllers/patientsController");
const verifyToken = require("../middlewares/verifyToken");
const {
  checkIDNumber,
  checkPhoneNumber,
  checkMedicalRecord,
  checkAddress,
  checkEmail,
  checkUserName,
} = require("../middlewares/checkInput");

router.post(
  "/registerpatient",
  verifyToken,
  checkIDNumber,
  checkUserName,
  checkEmail,
  checkAddress,
  checkPhoneNumber,
  checkMedicalRecord,
  paitentsController.registerPatient
);

router.use((err, res, req, next) => {
  console.log("From patient's route middleware", err.message);
});

module.exports = router;
