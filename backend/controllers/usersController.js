const bcrypt = require("bcrypt");
const { getDatabase, client } = require("../helpers/connectDB");
const returnStatus = require("../helpers/returnStatus");
const signToken = require("../helpers/signToken");
const fs = require("fs");
const path = require("path");

const usersController = {
  signIn: async (req, res) => {
    try {
      const db = await getDatabase();
      var user = null;
      console.log("from userController", req.body);

      //Check if the email is doctor's email or admin's email
      const admin = await db.collection("admin").findOne({
        email: req.body.email,
      });

      const doctor = await db.collection("doctors").findOne({
        email: req.body.email,
      });

      if (!admin && !doctor) {
        return returnStatus(res, 404, true, "Not Found!");
      }

      if (admin) {
        user = admin;
      }
      if (doctor) {
        user = doctor;
      }

      //Compare password
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err || !result) {
          return returnStatus(res, 401, true, "Invalid Email/Password");
        }

        //Genaerate JWT
        const newJWT = signToken({
          email: user.email,
        });

        //send token
        return returnStatus(res, 200, false, `Welcome ${user.username}`, {
          token: newJWT,
          username: user.username,
        });
      });
    } catch (err) {
      console.log(err);
      return returnStatus(res, 500, true, "Internal server error");
    } finally {
      if (client) {
        await client.close();
      }
    }
  },

  checkifLoggedIn: async (req, res) => {
    try {
      const db = await getDatabase();

      //decodedtoken is from verifyToken mddleware
      const admin = await db.collection("admin").findOne({
        email: req.decodedtoken.email,
      });

      //check if the user is admin, if true, send admin:true object
      if (admin) {
        return returnStatus(res, 200, false, "Ok", { admin: true });
      }

      const doctor = await db.collection("doctors").findOne({
        email: req.decodedtoken.email,
      });
      //check if this user is doctor, if true, send doctor:true object
      if (doctor) {
        const uploadsDir = path.join(__dirname, "/../uploads");
        var image = null;

        const files = await fs.promises.readdir(uploadsDir);

        //Find th file with the corresponding user ID, regardless of the extension
        const imageFile = files.find((file) =>
          file.startsWith(doctor.idnumber)
        );

        var base64Image = "";

        if (imageFile) {
          //Read the image file
          const imagePath = path.join(uploadsDir, imageFile);
          image = fs.readFileSync(imagePath);

          //Convert the image into base64
          base64Image = Buffer.from(image).toString("base64");
        }

        return returnStatus(res, 200, false, "Ok", {
          image: base64Image,
          doctor: true,
          idnumber: doctor.idnumber,
          phone: doctor.phone,
          email: doctor.email,
          username: doctor.username,
        });
      } else {
        return returnStatus(res, 401, true, "Unauthorized");
      }
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

module.exports = usersController;
