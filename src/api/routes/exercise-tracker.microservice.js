const router = require("express").Router();
const { createUser, getAllUsers } = require("../../dal/tracker/userModel");

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

router.post("/api/users/:id/exercises", (req, res) => {});

router.get("/api/users/:id/logs", (req, res) => {
  console.log(req.params.id); //param id
  console.log(req.query.from); //qs from
  console.log(req.query.to); //qs to
  console.log(req.query.limit); //qs limit
  res.send({});
});

module.exports = router;
