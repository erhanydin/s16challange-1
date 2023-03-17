/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
    return knex.schema
        .createTable('roles', (table) => {
            table.increments('role_id')
            table.string('role_name', 32).notNullable().unique()
        })
        .createTable('users', (table) => {
            table.increments('user_id')
            table.string('name', 128).notNullable()
            table.string('username', 128).notNullable().unique()
            table.string('email', 128).notNullable().unique()
            table.string('password', 128).notNullable()
            table.integer('role_id')
                .unsigned()
                .notNullable()
                .references('role_id')
                .inTable('roles')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        })
        .createTable('posts', (table) => {
            table.increments('post_id')
            table.string('post_header', 128).notNullable()
            table.string('post_details', 128).notNullable()
            table.string('post_date').notNullable()
            table.integer('user_id')
                .unsigned()
                .notNullable()
                .references('user_id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
                    .dropTableIfExists('posts')
                    .dropTableIfExists('users')
                    .dropTableIfExists('roles')
};
