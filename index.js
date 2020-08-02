const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

// start express
const app = express();
const port = process.env.PORT || 5200;

// express middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// setup mongoose connection
const URI = process.env.CONNECTION_URI || "";
mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
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
