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

// async function findClass(id) {
//   const clases = await db("class")
//     .join("users", "class.user_id", "=", "users.id")
//     .select(
//       "user_id",
//       "username",
//       "class_name",
//       "class_type",
//       "class_intensity",
//       "class_location"
//     );
//   return clases;
// }

async function findClass(id) {
  try {
    const clases = await db("class as c")
      .join("users as u", "u.id", "c.user_id")
      .where({ "c.user_id": id })
      .select(
        "c.user_id",
        "u.username",
        "c.class_name",
        "c.class_type",
        "c.class_intensity",
        "c.class_location",
        "c.start_time",
        "c.class_duration"
      );

    return clases;
  } catch (err) {
    throw err;
  }
}

function findClassById(id) {
  return db("class").where({ id }).first();
}
