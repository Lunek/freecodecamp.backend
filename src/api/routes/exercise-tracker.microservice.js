const router = require("express").Router();
const {
  createUser,
  getAllUsers,
  createExerciseByUserId,
  getAllLogsByUserId,
} = require("../../dal/tracker/userModel");

router.post("/api/users", (req, res) => {
  const { username } = req.body;
  createUser(username, (err, data) => {
    if (err) res.status(500).send(`Unable to add user. Error ${err}`);
    else
      res.send({
        username: data.username,
        _id: data._id.toString(),
      });
  });
});

router.get("/api/users", (req, res) => {
  getAllUsers((err, data) => {
    if (err) res.status(500).send(`Unable to add user. Error ${err}`);
    else {
      res.send(data);
    }
  });
});

router.post("/api/users/:id/exercises", (req, res) => {
  const { description, duration, date } = req.body;
  const userId = req.params.id;

  createExerciseByUserId(
    userId,
    {
      description,
      duration,
      date,
    },
    (err, data) => {
      if (err) res.status(500).send(`Unable to add user. Error ${err}`);
      else {
        res.send({
          _id: data.user._id,
          username: data.user.username,
          date: data.date.toDateString(),
          duration: data.duration,
          description: data.description,
        });
      }
    }
  );
});

router.get("/api/users/:id/logs", (req, res) => {
  const userId = req.params.id;
  const { from, to, limit } = req.query; // optional params

  if (from && to && limit) {
    // all optional params exists
    res.status(500).send({});
  } else {
    // no optional params
    getAllLogsByUserId(userId, (err, data) => {
      if (err) {
        res.status(500).send(`Unable to find logs by userId. Error ${err}`);
      } else {
        res.status(200).send({
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
    });
  }
});

module.exports = router;
