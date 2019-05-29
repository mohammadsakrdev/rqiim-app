require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const bodayParser = require("body-parser");
const passport = require("passport");

//Initialize app with express
const app = express();

const UserRoutes = require("./routes/users");
const AppointmentRoutes = require("./routes/appointment");

//Port to be used by the server
const _PORT = process.env.PORT;

//---------------- Middlewares ----------------//
//CROS MW
app.use(cors());
//Body Parser MW
app.use(bodayParser.json());
app.use(bodayParser.urlencoded({ extended: false }));

//Passport MW
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);
//---------------- Middlewares ----------------//

//Index Rotuer
app.get("/", (req, res, next) => {
  res.json("App is working");
});

//Users Routes
app.use("/api/user", UserRoutes);
app.use("/api/appointment", AppointmentRoutes);

//Database Connection
mongoose.connection.on("connected", () => {
  console.log("Connected to the database");
});
mongoose.connection.on("error", err => {
  console.log(`Unable to connect to the database: ${err}`);
});
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    //Start the server
    app.listen(_PORT, () => {
      console.log("Server Started");
    });
  })
  .catch(err => console.log(err));
