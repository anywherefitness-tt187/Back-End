const db = require("../data/db-config");

module.exports = {
  findAllClasses,
  findClass,
  findClassById,
  addClass,
  findClassById,
};

function findAllClasses() {
  return db("class");
}

async function addClass(newClass) {
  const [id] = await db("class").insert(newClass, "id");
  return findClassById(id);
}

async function findClass(id) {
  const clases = await db("class")
    .join("users", "users.id", "class.user_id")
    .select(
      "user_id",
      "username",
      "class_name",
      "class_type",
      "class_intensity",
      "class_location",
      "start_time",
      "class_duration",
      "class_max_size"
    );
  return clases;
}
function findClassById(id) {
  return db("class").where({ id }).first();
}
