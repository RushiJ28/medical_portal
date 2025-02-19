require("dotenv").config();
const express = require("express");
//It allows us to comunicate betw backend and frontend it cd be hhtp/https
const cors = require("cors");

const patientsRouter = require("./routes/patients");
const doctorsRouter = require("./routes/doctors");
const usersRouter = require("./routes/users");
const returnStatus = require("./helpers/returnStatus");
//Create an instance of Express
const app = express();
//Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

//apply route middleware to these routes
app.use("/patients", patientsRouter);
app.use("/doctors", doctorsRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("Hello...");
});

//Error handling middleware for non-exisiting routes
app.use((req, res, next) => {
  return returnStatus(res, 404, true, "Not Found");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is running on port: ", port);
});
