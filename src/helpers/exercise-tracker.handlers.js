const logsCallbackHandler = (response, err, data) => {
  if (err) {
    response.status(500).send(`Unable to find logs by userId. Error ${err}`);
  } else {
    response.status(200).send({
      _id: data._id,
      username: data.username,
      count: data.exercises.length,
      log: data.exercises.map((exercise) => {
        return {
          description: exercise.description,
          duration: exercise.duration,
          date: exercise.date.toDateString(),
        };
      }),
    });
  }
};

module.exports = { logsCallbackHandler };