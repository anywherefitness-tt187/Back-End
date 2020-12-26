const db = require("../data/db-config");
module.exports = {
  find,
  registerClient,
  findRegisteredClientById,
  removeClient,
};

function find() {
  return db("clients_registered");
}

async function registerClient(register) {
  const [id] = await db("clients_registered").insert(register, "id");
  return findRegisteredClientById(id);
}

function findRegisteredClientById(id) {
  return db("clients_registered").where({ id }).first();
}

function removeClient(id) {
  return db("clients_registered").del().where({ id });
}
