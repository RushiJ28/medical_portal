const bcrypt = require("bcrypt");
const { getDatabase, client } = require("../helpers/connectDB");
const returnStatus = require("../helpers/returnStatus");
const signToken = require("../helpers/signToken");

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
};

module.exports = usersController;
