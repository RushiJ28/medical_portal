const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patientsController");
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
  patientsController.registerPatient
);

router.get("/search", patientsController.searchPatient);

//Only doctors can add new medical reocrd so verify if it is doctor
router.post(
  "/addnewmedicalrecord",
  verifyToken,
  checkIDNumber,
  checkMedicalRecord,
  patientsController.addNewMedicalRecord
);

//Only admin can update info of a patient
router.post(
  "/updatecontact",
  verifyToken,
  checkIDNumber,
  checkEmail,
  checkPhoneNumber,
  patientsController.updateContact
);

router.use((err, res, req, next) => {
  console.log("From patient's route middleware", err.message);
});

module.exports = router;
