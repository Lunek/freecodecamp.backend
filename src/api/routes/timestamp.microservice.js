const router = require("express").Router();
const {
  validateAndCastDateToMoment,
} = require("../middleware/timestamp.middleware.js");

router.get("/api/:date", validateAndCastDateToMoment, (req, res) => {
  // We can get parsed date from middleware
  const parsedDate = new Date(req.parsedDate);

  const response = {
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  };

  res.send(response);
});

router.get("/api", (req, res) => {
  const currentDate = new Date();

  const response = {
    unix: currentDate.getTime(),
    utc: currentDate.toUTCString(),
  };

  res.send(response);
});

module.exports = router;
