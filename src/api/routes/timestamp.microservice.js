const router = require('express').Router();
const moment = require('moment');
const {
  validateAndCastDateToMoment
} = require("../middleware/timestamp.middleware.js");

router.get("/:date", validateAndCastDateToMoment, (req, res) => {
  // We can get parsed date from middleware
  const parsedDate = req.parsedDate;

  const response = {
    unix: parsedDate.unix(),
    utc: parsedDate.toString(),
  };

  res.send(response);
});

router.get("/", (req, res) => {
  const currentDate = moment();

  const response = {
    unix: currentDate.unix(),
    utc: currentDate.toString(),
  };

  res.send(response);
});

module.exports = router;