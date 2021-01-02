const router = require("express").Router();
const classes = require("./class-model");
const registered = require("../registered/registered-model");

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

//get list of student that joined the class
router.get("/:id/clients", (req, res) => {
  registered
    .findClients(req.params.id)
    .then((clients) => {
      res.status(200).json(clients);
    })
    .catch((err) => res.send(err));
});

//add client to class
router.post("/:id/clients", (req, res) => {
  const newStudent = {
    class_id: req.params.id,
    client_name: req.body.client_name,
    class_name: req.body.class_name,
    class_date: req.body.class_date,
  };
  registered.registerClient(newStudent).then((student) => {
    res
      .status(200)
      .json({
        message: `${req.body.client_name} has signed up for ${req.body.class_name}`,
        student,
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  });
});

//update classes
router.put("/:id", (req, res) => {
  const updatedClass = {
    username: req.body.username,
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
