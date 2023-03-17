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
        .createTable('comments', (table) => {
            table.increments('comment_id')
            table.string('comment_details', 512).notNullable();
        })
        .createTable('posts', (table) => {
            table.increments('post_id')
            table.string('post_header', 128).notNullable()
            table.string('post_details', 128).notNullable()
            table.string('post_date').defaultTo(knex.fn.now()).notNullable()
            table.integer('user_id')
                .unsigned()
                .notNullable()
                .references('user_id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        })
        .createTable('posts_comments', (table) => {
            table.integer('post_id')
                .unsigned()
                .notNullable()
                .references('post_id')
                .inTable('posts')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            table.integer('comment_id')
                .unsigned()
                .notNullable()
                .references('comment_id')
                .inTable('comments')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            table.primary(['post_id', 'comment_id'])    
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('posts_comments')
        .dropTableIfExists('posts')
        .dropTableIfExists('comments')
        .dropTableIfExists('users')
        .dropTableIfExists('roles')
};
