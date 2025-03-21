const express = require("express");
const router = express.Router();
const doctorsController = require("../controllers/doctorsController");
const verifyToken = require("../middlewares/verifyToken");
const returnStatus = require("../helpers/returnStatus");
const fs = require("fs");
const path = require("path");
const formidable = require("formidable");

const {
  checkIDNumber,
  checkPhoneNumber,
  checkEmail,
  checkPassword,
  checkUserName,
} = require("../middlewares/checkInput");

router.post(
  "/registerdoctor",
  verifyToken,
  (req, res, next) => {
    const uploadDir = path.join(__dirname, "..", "uploads");

    const form = new formidable.IncomingForm({
      uploadDir: uploadDir,
      //allow 1 Megabyte file size limit
      maxFileSize: 1 * 1024 * 1024,
    });

    //From the frontend, we passed 'file' and 'data' as  multiform, formidable gives the form-data via fields parameter and files(like an image) via the files parameter below
    form.parse(req, async (error, fields, files) => {
      if (error) {
        return returnStatus(
          res,
          400,
          true,
          "Error uploading file, file limit 1MB"
        );
      }

      //the data we passed from the frontend is in a JSON format so we turn it into JavaScript object
      const formData = JSON.parse(fields.data);

      if (formData) {
        const { idnumber, phone, email, username, password } = formData;

        req.body.idnumber = idnumber;
        req.body.phone = phone;
        req.body.email = email;
        req.body.username = username;
        req.body.password = password;

        req.uploadedImageFilePath = files.file[0].filepath;
        req.uploadedImageName = files.file[0].originalFilename;

        next();
      } else {
        return returnStatus(res, 400, true, "User data doesn't exist");
      }
    });
  },
  checkIDNumber,
  checkPhoneNumber,
  checkEmail,
  checkUserName,
  checkPassword,
  doctorsController.registerDoctor
);

router.get("/search", doctorsController.searchDoctor);

router.post(
  "/updatecontact",
  verifyToken,
  checkIDNumber,
  checkEmail,
  checkPhoneNumber,
  doctorsController.updateContact
);

router.use((err, req, res, next) => {
  if (req.uploadedImageFilePath) {
    fs.unlink(req.uploadedImageFilePath, (err) => {
      if (err) {
        console.log("Error deleting temporary file", err);
      }
      console.log("File deleted successfully");
    });
  }
  //If other errors are thrown from middlewares such as checkEmail, checkPassowrd... then we alos display those errors via err.message
  console.log("From doctors route middleware", err.message);
});

module.exports = router;
