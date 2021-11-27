const dns = require("dns");

const checkThatUrlIsValid = (req, res, next) => {
  let { url } = req.body;

  const httpRegex = /^(http|https)(:\/\/)/;
  if (!httpRegex.test(url)) {
    return res.status(500).send({ error: "invalid url" });
  }
  url = url.replace(httpRegex, "");

  dns.lookup(url, (err, address, number) => {
    if (err) {
      return res.status(500).send({
        error: "invalid url",
      });
    } else {
      next();
    }
  });
};

module.exports = {
  checkThatUrlIsValid,
};
