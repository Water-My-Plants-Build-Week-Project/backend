exports.up = function(knex) {
  return knex.schema 
    .createTable('users', table => {
        table.increments('user_id')
        table.string('username', 128).notNullable().unique()
        table.string('password', 128).notNullable()
        table.string('phone_number', 128).notNullable()
    })
    .createTable('plants', table => {
        table.increments()
        table.string('nickname', 128).notNullable()
        table.string('species', 128).notNullable()
        table.string('scientific_name', 128)
        table.string('h2oFrequency', 128).notNullable()
        table.string('img', 128).default('N/A')
        table.integer('user_id')
            .unsigned()
            .references('user_id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('plants')
    .dropTableIfExists('users')
};
