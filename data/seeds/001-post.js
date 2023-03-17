/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').truncate()
  await knex('users').truncate()
  await knex('roles').truncate()
  
  
  await knex('roles').insert([
    {role_name: 'admin'},
    {role_name: 'user'},
    {role_name: "manager"}
  ]);
  
  await knex('users').insert([
    {
      name:"Erhan Aydin",
      username: "ea",
      email: "ea@gmail.com",
      password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq",
      role_id: "1"
    },
    {
      name:"Kaan Aydin",
      username: "ka",
      email: "ka@gmail.com",
      password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq",
      role_id: "3"
    },
  ]);
  await knex('posts').insert([
    {
      post_header:"Post Header Sample 1",
      post_details: "Post Details Sample 1",
      post_date: "2023-03-15 14:22:50",
      user_id: "2"
    },
    {
      post_header:"Post Header Sample 2",
      post_details: "Post Details Sample 2",
      post_date: "2023-03-15 14:22:55",
      user_id: "2"
    },
  ]);

};
