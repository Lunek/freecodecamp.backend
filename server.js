// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();
require('dotenv').config({path: './environment/development.env'});

const timestamp = require("./src/api/routes/timestamp.microservice");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("src/static"));

// logging request to the console
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/src/views/home.html");
});

app.get("/timestamp", function (req, res) {
  res.sendFile(__dirname + "/src/views/timestamp.html");
});

app.use("/api", timestamp);

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
