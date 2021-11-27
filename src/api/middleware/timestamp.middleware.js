const validateAndCastDateToMoment = (req, res, next) => {
  const sendDate = req.params.date;

  // detect if received date is unix timestamp
  const isReceivedDateUnix = !isNaN(Number(sendDate));

  if (isReceivedDateUnix) {
    // if received unix
    req.parsedDate = new Date(Number(sendDate));
  } else if (isDate(sendDate)) {
    // if received is string and can be parsed to date
    req.parsedDate = new Date(sendDate);
  } else {
    res.send({ error: "Invalid Date" });
  }
  next();
};

const isDate = (date) => {
  return new Date(date) !== "Invalid Date" && !isNaN(new Date(date));
};

module.exports = {
  validateAndCastDateToMoment,
};