const classes = require("../api/class/class-model");

module.exports = {
  validateClassId,
  validateClass,
};

function validateClassId(req, res, next) {
  const { id } = req.params;

  classes
    .findClassById(id)
    .then((classes) => {
      if (!classes) {
        res
          .status(400)
          .json({ message: "invalid class id; class does not exist" });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log("Error getting id", err);
    });
}

function validateClass(req, res, next) {
  if (
    !req.body.class_name ||
    !req.body.class_type ||
    !req.body.class_intensity ||
    !req.body.class_location ||
    !req.body.start_time ||
    !req.body.class_duration ||
    !req.body.class_max_size
  ) {
    res.status(400).json({
      message:
        "You are either missing a valid class name, class type, class intensity, class location, start time, class duration, or class max size. Make sure you submit all fields",
    });
  } else {
    next();
  }
}
