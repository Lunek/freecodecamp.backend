const dns = require("dns");

const checkThatUrlIsValid = (req, res, next) => {
  const originalURL = req.body.url;

  const httpRegex = /^(http|https)(:\/\/)/;
  if (!httpRegex.test(originalURL)) {
    return res.json({ error: "invalid url" });
  }

  const urlObject = new URL(originalURL);
  dns.lookup(urlObject.hostname, (err, address, family) => {
    if (err) {
      res.json({ error: "invalid url" });
    } else {
      next();
    }
  });
};

module.exports = {
  checkThatUrlIsValid,
};
