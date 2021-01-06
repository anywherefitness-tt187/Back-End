const bcryptjs = require("bcryptjs");
const password = "password";
const hash = bcryptjs.hashSync(password, 8);
const instructor = "instructor";
const client = "client";

exports.seed = function (knex) {
  const users = [
    {
      username: "LarryLobster",
      password: hash,
      role: instructor,
    },
    {
      username: "Spongebob",
      password: hash,
      role: client,
    },
    {
      username: "Patrick",
      password: hash,
      role: client,
    },
    {
      username: "Sandy",
      password: hash,
      role: client,
    },
    {
      username: "Squidward",
      password: hash,
      role: client,
    },
    {
      username: "Plankton",
      password: hash,
      role: client,
    },
  ];

  return knex("users")
    .insert(users)
    .then(() => console.log("\n== Seed data for users table added. ==\n"));
};
