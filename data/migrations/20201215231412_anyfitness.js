exports.up = function (knex) {
  return knex.schema
    .createTable("role", (tbl) => {
      tbl.increments();
      tbl.string("role", 128).notNullable().unique();
    })
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("username", 128).notNullable().unique().index();
      tbl.string("password", 256).notNullable().unique().index();
      tbl
        .string("role")
        .references("role.role")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("class", (tbl) => {
      tbl.increments();
      tbl.string("class_name ", 128).notNullable().unique();
      tbl.string("class_type", 128).notNullable();
      tbl.string("class_intensity", 128).notNullable();
      tbl.string("class_location", 128).notNullable();
      tbl.string("start_time", 128).notNullable();
      tbl.string("class_duration", 128).notNullable();
      tbl.string("class_max_size", 128).notNullable();
      tbl
        .integer("user_id")
        .references("users.id")
        .notNullable()
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("clients_registered", (tbl) => {
      tbl.increments();
      tbl.string("client_name", 128).notNullable();
      tbl.string("class_name", 128).notNullable();
      tbl.string("class_date", 128).notNullable();
      tbl
        .integer("class_id")
        .references("class.id")
        .notNullable()
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("role")
    .dropTableIfExists("users")
    .dropTableIfExists("class")
    .dropTableIfExists("clients_registered");
};
