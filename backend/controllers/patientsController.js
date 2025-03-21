const { getDatabase, client } = require("../helpers/connectDB");
const returnStatus = require("../helpers/returnStatus");

const patientsController = {
  registerPatient: async (req, res, next) => {
    try {
      const db = await getDatabase();

      //When registering a patient we need to check if the email and idnumber does not match with any existing doctors
      const doctorid = await db.collection("doctors").findOne({
        $or: [{ email: req.body.email }, { idnumber: req.body.idnumber }],
      });
      if (doctorid) {
        returnStatus(
          res,
          400,
          true,
          "You can't register a patient using this Email or IDNumber."
        );
      }

      const doctor = await db
        .collection("doctors")
        .findOne({ email: req.decodedtoken.email });

      const admin = await db
        .collection("admin")
        .findOne({ email: req.decodedtoken.email });

      // If the email that is used to register a patient exists in the admin collection,reject the request
      const emailExistForAdmin = await db.collection("admin").findOne({
        email: req.body.email,
      });

      if (emailExistForAdmin) {
        returnStatus(
          res,
          400,
          true,
          "You can't register a patient using this Email."
        );
      }

      const medicalrecord = doctor
        ? [
            {
              date: new Date().toLocaleDateString("en-GB"),
              record: req.body.medicalrecord,
            },
          ]
        : [];

      //If doctor or admin made this request, then we can register the patient
      if (doctor || admin) {
        const patients_collection = db.collection("patients");

        //If id or email already exists for a patient int the patient's collection then dont register a patient
        const patient = await patients_collection.findOne({
          $or: [{ email: req.body.email }, { idnumber: req.body.idnumber }],
        });

        if (patient) {
          returnStatus(res, 400, true, "Patient already exists.");
        }

        const result = await patients_collection.insertOne({
          idnumber: req.body.idnumber,
          username: req.body.username,
          email: req.body.email,
          address: req.body.address,
          phone: req.body.phone,
          medicalrecord: medicalrecord,
        });

        return returnStatus(res, 200, false, "Patient Added");
      }
      return returnStatus(
        res,
        401,
        true,
        "You aren't allowed to register a patient"
      );
    } catch (err) {
      console.log(err);
      return returnStatus(res, 500, true, "Internal server error");
    } finally {
      if (client) {
        await client.close();
      }
    }
  },
};

module.exports = patientsController;
