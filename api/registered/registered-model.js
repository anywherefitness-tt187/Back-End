const db = require("../../data/db-config");
module.exports = {
  find,
  registerClient,
  findRegisteredClientById,
  findClients,
  removeClient,
};

function find() {
  return db("clients_registered");
}

async function findClients(id) {
  const client = await db("clients_registered as cr")
    .join("class as c", "c.id", "cr.class_id")
    .where({ "cr.class_id": id })
    .select(
      "cr.class_id",
      "c.class_name",
      "c.class_type",
      "cr.client_name",
      "cr.id"
    );
  return client;
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
