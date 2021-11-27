const router = require('express').Router();

router.get("/api", (req, res) => {
  const currentDate = new Date();

  const response = {
    unix: currentDate.getTime(),
    utc: currentDate.toUTCString(),
  };

  res.send(response);
});

module.exports = router;