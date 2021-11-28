const router = require("express").Router();

router.post("/api/users", (req, res) => {
});

router.post("/api/users/:id/exercises", (req, res) => {
});

router.get("/api/users/:id/logs", (req, res) => {
    console.log(req.params.id); //param id
    console.log(req.query.from); //qs from
    console.log(req.query.to); //qs to
    console.log(req.query.limit); //qs limit
    res.send({
    })
});

module.exports = router;
