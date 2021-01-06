exports.seed = function (knex) {
  const registeredUsers = [
    {
      client_name: "Spongebob",
      class_id: "1",
    },
    {
      client_name: "Patrick",
      class_id: "1",
    },
    {
      client_name: "Sandy",
      class_id: "1",
    },
    {
      client_name: "Squidward",
      class_id: "1",
    },
    {
      client_name: "Plankton",
      class_id: "1",
    },
  ];

  return knex("clients_registered")
    .insert(registeredUsers)
    .then(() =>
      console.log("\n== Seed data for clients_registered table added. ==\n")
    );
};
