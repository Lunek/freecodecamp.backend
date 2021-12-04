const router = require("express").Router();
const {
  createUser,
  getAllUsers,
  createExerciseByUserId,
  getAllLogsByUserId,
  getAllLogsByUserIdWithFilteres,
} = require("../../dal/tracker/userModel");
const {
  logsCallbackHandler,
} = require("../../helpers/exercise-tracker.handlers");

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
    getAllLogsByUserIdWithFilteres(
      userId,
      {
        limit: limit,
        from: new Date(from),
        to: new Date(to),
      },
      (err, data) => {
        logsCallbackHandler(res, err, data);
      }
    );
  } else {
    // no optional params
    getAllLogsByUserId(userId, (err, data) =>
      logsCallbackHandler(res, err, data)
    );
  }
});

module.exports = router;
