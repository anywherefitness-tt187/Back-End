const router = require("express").Router();
const classes = require("./class-model");

//find classes
router.get("/", (req, res) => {
  classes
    .findAllClasses()
    .then((classes) => {
      res.status(200).json(classes);
    })
    .catch((err) => res.send(err));
});

//find class by id
router.get("/:id", (req, res) => {
  classes
    .findClassById(req.params.id)
    .then((findClass) => {
      res.status(200).json(findClass);
    })
    .catch((err) => {
      res.send(err);
    });
});

//update classes
router.put("/:id", (req, res) => {
  const updatedClass = {
    class_name: req.body.class_name,
    type: req.body.class_type,
    intensity: req.body.class_intensity,
    start_time: req.body.start_time,
    duration: req.body.class_duration,
    capacity: req.body.class_max_size,
  };
  classes
    .updateClass(req.params.id, req.body)
    .then(() => {
      res.status(201).json({
        message: `Your class has been updated`,
        updatedClass,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

//delete class
router.delete("/:id", (req, res) => {
  classes
    .remove(req.params.id)
    .then(() => {
      res.json({ message: "The class has been deleted please refresh page" });
    })
    .catch((err) => {
      res.send(err);
    });
});
module.exports = router;
