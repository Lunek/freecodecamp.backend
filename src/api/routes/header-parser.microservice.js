const router = require('express').Router();

router.get("/api/whoami", (req, res) => {
  const response = {
    ipadress: req.ip,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"],
  };

  res.send(response);
});

module.exports = router;