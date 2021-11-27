const moment = require('moment');

const validateAndCastDateToMoment = (req, res, next) => {
  const sendDate = req.params.date;
  // try cast the date to moment object
  const dateInNormalFormat = moment(sendDate, "YYYY-MM-DD");
  const dateInUnixFormat = moment.unix(sendDate);
  // validate it and pass to handler parsedDate
  if (dateInNormalFormat.isValid()) {
    req.parsedDate = dateInNormalFormat;
    next();
  } else if (dateInUnixFormat.isValid()) {
    req.parsedDate = dateInUnixFormat;
    next();
  } else {
    res.send({ error: "Invalid Date" });
  }
}

module.exports = {
  validateAndCastDateToMoment
};