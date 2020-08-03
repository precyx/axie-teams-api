const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./config/db");

// start express
const app = express();
const port = db.port;

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// setup mongoose connection
const URI = db.connectionString;
// prettier-ignore
mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongoDB connected!");
});

// load routes
const teamRouter = require("./routes/teams");
app.use("/teams", teamRouter);

// start listening
app.listen(port, () => {
  console.log("server is running");
});
