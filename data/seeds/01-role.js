exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

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
