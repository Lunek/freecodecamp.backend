const router = require("express").Router();
const {
  findShortUrlByOriginalOrCreateNewOne,
  findUri,
} = require("../../dal/shortener/shortUriModel");
const { checkThatUrlIsValid } = require("../middleware/shortener.middleware");

router.post("/api/shorturl", checkThatUrlIsValid, (req, res) => {
  const { url } = req.body;

  findShortUrlByOriginalOrCreateNewOne(url, (err, encodedModel) => {
    if (err) {
      res.status(500).send(`An error occured: ${err}`);
    } else {
      res.send({
        original_url: encodedModel.originalUrl,
        short_url: encodedModel._id.toString(),
      });
    }
  });
});

router.get("/api/shorturl/:short", (req, res) => {
  findUri(req.params.short, (err, encodedModel) => {
    if (err) {
      res.status(500).send("Could not find original URL by specified short");
    } else {
      res.redirect(encodedModel.originalUrl);
    }
  });
});

module.exports = router;
