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

module.exports = router;
