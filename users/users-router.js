const router = require("express").Router();
const users = require("./users-model");

router.get("/", (req, res) => {
  users
    .find()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.send(err));
});

router.get("/role", (req, res) => {
  users
    .findRole()
    .then((role) => res.status(200).json(role))
    .catch((err) => res.send(err));
});

router.post("/:id", (req, res) => {
  const userId = req.params.id;
  const role = { users_id: req.params.id, role: req.body.role };
  users.addRole(role).then((role) => {
    res
      .status(200)
      .json(role)
      .catch((err) => res.send(err));
  });
});
module.exports = router;
