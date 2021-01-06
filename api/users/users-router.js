const router = require("express").Router();
const users = require("./users-model");
const classes = require("../class/class-model");
const { validateUserId } = require("../../middleware/users-middleware");
const { validateClass } = require("../../middleware/class-middleware");
const restricted = require("../../middleware/restricted-middleware");

//get users
router.get("/", (req, res) => {
  users
    .find()
    .then((users) => res.status(200).json(users))
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

//get users byId
router.get("/:id", validateUserId, (req, res) => {
  users
    .findById(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.send(err));
});

//Instructor's classes
router.get("/:id/class", validateUserId, (req, res) => {
  classes
    .findClass(req.params.id)
    .then((userClass) => {
      res.status(200).json(userClass);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

//create a new class, instructor only
router.post("/:id/class", validateClass, validateUserId, (req, res) => {
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
      res.status(201).json(classes);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message:
          "This class already exists please choose a different class name",
      });
    });
});

module.exports = router;
