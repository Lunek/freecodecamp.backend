const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  const file = req.file;

  if (file) {
    res.status(200).send({
      name: file.originalname,
      type: file.mimetype,
      size: file.size,
    });
  } else {
    res.status(500).send("An error occured");
  }
});

module.exports = router;
