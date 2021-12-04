const router = require("express").Router();

router.post("/api/fileanalyse", (req, res) => {
  console.log('FILE RECEIVED', req.body);
  res.status(500).send("An error occured");
});

module.exports = router;
