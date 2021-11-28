// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config({path: './environment/development.env'});

const parser = require("./src/api/routes/header-parser.microservice");
const timestamp = require("./src/api/routes/timestamp.microservice");
const shortener = require("./src/api/routes/url-shortener.microservice")
const tracker = require("./src/api/routes/exercise-tracker.microservice")

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204
app.use(bodyParser.urlencoded({ extended: false }))

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

app.get("/parser", function (req, res) {
  res.sendFile(__dirname + "/src/views/parser.html");
});

app.get("/shortener", function (req, res) {
  res.sendFile(__dirname + "/src/views/shortener.html");
});

app.get("/tracker", function (req, res) {
  res.sendFile(__dirname + "/src/views/exerciseTracker.html");
});


app.use("/timestamp", timestamp);
app.use("/parser", parser);
app.use("/shortener", shortener);
app.use("/tracker", tracker);

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
