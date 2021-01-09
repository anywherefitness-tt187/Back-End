const router = require("express").Router();
const classes = require("./class-model");
const registered = require("../registered/registered-model");

const {
  validateClassId,
  validateClass,
} = require("../../middleware/class-middleware");

const {
  verifyStudentsinClass,
} = require("../../middleware/registered-middleware");

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
router.get("/:id", validateClassId, (req, res) => {
  classes
    .findClassById(req.params.id)
    .then((findClass) => {
      res.status(200).json(findClass);
    })
    .catch((err) => {
      res.send(err);
    });
});

//get list of student that joined the class
router.get(
  "/:id/clients",
  validateClassId,
  verifyStudentsinClass,
  (req, res) => {
    registered
      .findClients(req.params.id)
      .then((clients) => {
        res.status(200).json(clients);
      })
      .catch((err) => res.send(err));
  }
);

//add client to class
router.post("/:id/clients", validateClassId, (req, res) => {
  const newStudent = {
    class_id: req.params.id,
    client_name: req.body.client_name,
  };
  registered
    .registerClient(newStudent)
    .then((student) => {
      res.status(201).json({
        message: `${req.body.client_name} has signed up for the class`,
        student,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

//update classes
router.put("/:id", validateClassId, validateClass, (req, res) => {
  const updatedClass = {
    class_name: req.body.class_name,
    class_type: req.body.class_type,
    class_intensity: req.body.class_intensity,
    class_location: req.body.class_location,
    start_time: req.body.start_time,
    class_duration: req.body.class_duration,
    class_max_size: req.body.class_max_size,
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
router.delete("/:id", validateClassId, (req, res) => {
  classes
    .remove(req.params.id)
    .then(() => {
      res
        .status(200)
        .json({ message: "The class has been deleted please refresh page" });
    })
    .catch((err) => {
      res.send(err);
    });
});
module.exports = router;
