const db = require("../../data/db-config");

module.exports = {
  find,
  findBy,
  findById,
  add,
  addRole,
  findRole,
  findRoleById,
};

async function find() {
  return await db("users").select("id", "username", "role").orderBy("id");
}

function findById(id) {
  return db("users").where({ id }).first().select("id", "username", "role");
}

function findRole() {
  return db("role").select("id", "role").orderBy("id");
}

function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");
  return findById(id);
}
async function findRoleById(id) {
  return db("role").where({ id }).first();
}

async function addRole(role) {
  const [id] = await db("role").insert(role, "id");
  return findRoleById(id);
}
