const db = require("../../data/db-config");

module.exports = {
  findAllClasses,
  findClass,
  findClassById,
  addClass,
  updateClass,
  remove,
};

function findAllClasses() {
  return db("class");
}

async function addClass(newClass) {
  const [id] = await db("class").insert(newClass, "id");
  return findClassById(id);
}

async function findClass(id) {
  try {
    const clases = await db("class as c")
      .join("users as u", "u.id", "c.user_id")
      .where({ "c.user_id": id })
      .select(
        "c.id",
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

function updateClass(id, changes) {
  return db("class").where({ id }).update(changes);
}

function findClassById(id) {
  return db("class").where({ id }).first();
}

function remove(id) {
  return db("class").del().where({ id });
}
