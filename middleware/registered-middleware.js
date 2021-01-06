const registered = require("../api/registered/registered-model");

module.exports = {
  verifyStudentsinClass,
};

async function verifyStudentsinClass(req, res, next) {
  const { id } = req.params;

  const student = await registered.findClients(id);

  if (student.length === 0) {
    res.status(404).json("There are no students in this class");
    console.log(student);
  } else {
    next();
  }
}
