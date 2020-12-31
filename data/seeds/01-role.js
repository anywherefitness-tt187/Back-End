exports.seed = function (knex) {
  const role = [
    {
      role: "admin",
    },
    {
      role: "instructor",
    },
    {
      role: "client",
    },
  ];

  return knex("role")
    .insert(role)
    .then(() => console.log("\n== Seed data for roles table added. ==\n"));
};
