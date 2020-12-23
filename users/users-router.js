const router = require("express").Router();
const users = require("./users-model");
const classes = require("../class/class-model");

//get users
router.get("/", (req, res) => {
  users
    .find()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.send(err));
});

//get roles of users
router.get("/role", (req, res) => {
  users
    .findRole()
    .then((role) => res.status(200).json(role))
    .catch((err) => res.send(err));
});

//add a role to user, instructor/client/admin
router.post("/:id", (req, res) => {
  const role = { users_id: req.params.id, role: req.body.role };
  users.addRole(role).then((role) => {
    res
      .status(200)
      .json(role)
      .catch((err) => res.send(err));
  });
});
//create a new class, instructor only
router.post("/:id/class", (req, res) => {
  const newClass = {
    user_id: req.params.id,
    class_name: req.body.class_name,
    class_type: req.body.class_type,
    class_intensity: req.body.class_intensity,
    class_location: req.body.class_location,
    start_time: req.body.start_time,
    class_duration: req.body.class_duration,
    class_max_size: req.body.class_max_size,
  };
  classes
    .addClass(newClass)
    .then((classes) => {
      res.status(200).json(classes);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

router.get("/:id/class", (req, res) => {
  const { id } = req.params.id;
  classes
    .findClass(id)
    .then((userClass) => {
      res.status(200).json(userClass);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
