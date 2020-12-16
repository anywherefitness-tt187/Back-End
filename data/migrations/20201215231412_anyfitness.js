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
        .integer("role")
        .unsigned()
        .references("role.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableifExists("roles").dropTableifExists("users");
};
