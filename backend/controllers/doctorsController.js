const { getDatabase, client } = require("../helpers/connectDB");
const createHash = require("../helpers/createHash");
const returnStatus = require("../helpers/returnStatus");
const createImage = require("../helpers/createImage");

// When registering a doctor we upload an image for a doctor and if something goes wrong such as the doctor already exists, Unauthorized request or any error occurs , we need to throw error using "return next(new Error())" ,this error is then caught from the middleware we define in app.use() in /routes/doctor.js to delete the uploaded image by 'formidable' when registering a doctor.
const doctorsController = {
  registerDoctor: async (req, res, next) => {
    try {
      const db = await getDatabase();

      // We get the 'decodedtoken' property attached to the req object from the verifyToken middleware,if the email does not belong to admin from the token then reject registering doctor
      const admin = await db.collection("admin").findOne({
        email: req.decodedtoken.email,
      });

      if (!admin) {
        returnStatus(res, 401, true, "Unauthorized request");
        return next(new Error());
      }

      // If the email that is used to register a doctor exists in the admin collection,reject the request
      const emailExistsForAdmin = await db.collection("admin").findOne({
        email: req.body.email,
      });

      if (emailExistsForAdmin) {
        returnStatus(
          res,
          400,
          true,
          "You can not register a doctor using this email"
        );
        return next(new Error());
      }

      // we have idnumber and email for patients too so check if the idnumber and email for registering a doctor exist in patients
      const patient = await db.collection("patients").findOne({
        $or: [{ email: req.body.email }, { idnumber: req.body.idnumber }],
      });

      // if the idnumber or email found for a patient,we can't register doctor using that idnumber or email
      if (patient) {
        returnStatus(
          res,
          400,
          true,
          "You can not use this idnumber or email for registering doctor"
        );
        return next(new Error());
      }

      // If admin exists that means, this request is coming from admin so we can create a doctor
      if (admin) {
        const doctors_collection = db.collection("doctors");
        // check if doctor is already registered
        const doctor = await doctors_collection.findOne({
          $or: [{ email: req.body.email }, { idnumber: req.body.idnumber }],
        });

        if (doctor) {
          returnStatus(res, 400, true, "Doctor is already registered");
          return next(new Error());
        } else {
          //create the hashed password for the doctor
          const hash = await createHash(req.body.password);

          if (createImage(req)) {
            console.log("Image created");
          } else {
            returnStatus(res, 400, true, "Error uploading file");
            return next(new Error());
          }

          //insert document to the db
          const result = await doctors_collection.insertOne({
            idnumber: req.body.idnumber,
            phone: req.body.phone,
            email: req.body.email,
            username: req.body.username,
            password: hash,
          });

          console.log("doctor registered");
          return returnStatus(res, 201, false, "Doctor Registered");
        }
      }
    } catch (err) {
      console.log(err);
      returnStatus(res, 500, true, "Internal server error");
      return next(new Error());
    } finally {
      if (client) {
        await client.close();
      }
    }
  },

  searchDoctor: async (req, res) => {
    try {
      const db = await getDatabase();

      const doctor = await db.collection("doctors").findOne(
        {
          idnumber: req.query.idnumber,
        },
        { projection: { _id: 0, password: 0 } } //projection helps to omit fields, if we set the value to 0
      );

      if (doctor) {
        const doctorJson = JSON.stringify(doctor);
        return returnStatus(res, 200, false, "Doctor Found", {
          doctor: doctorJson,
        });
      } else {
        return returnStatus(res, 400, true, "Doctor Not Found");
      }
    } catch (err) {
      console.log(err);
      return returnStatus(res, 500, true, "Internal Server Error");
    } finally {
      if (client) {
        await client.close();
      }
    }
  },
};

module.exports = doctorsController;
