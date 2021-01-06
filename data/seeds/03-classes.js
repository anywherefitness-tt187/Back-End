exports.seed = function (knex) {
  const classes = [
    {
      class_name: "Larry's Bootcamp",
      class_type: "Weight Lifting",
      class_intensity: "Beginner",
      class_location: "Bikini Bottom",
      start_time: "2021-01-31 10:00 AM",
      class_duration: "2 hours",
      class_max_size: "30",
      user_id: "1",
    },
  ];

  return knex("class")
    .insert(classes)
    .then(() => console.log("\n== Seed data for users table added. ==\n"));
};
