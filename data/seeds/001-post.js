/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('posts_comments').truncate()
  await knex('posts').truncate()
  await knex('comments').truncate()
  await knex('users').truncate()
  await knex('roles').truncate()


  await knex('roles').insert([
    { role_name: 'admin' },
    { role_name: 'user' },
    { role_name: "manager" }
  ]);


  await knex('users').insert([
    {
      name: "Erhan Aydin",
      username: "ea",
      email: "ea@gmail.com",
      password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq",
      role_id: "1"
    },
    {
      name: "Kaan Aydin",
      username: "ka",
      email: "ka@gmail.com",
      password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq",
      role_id: "3"
    },
    {
      name: "Anil Aydin",
      username: "aa",
      email: "aa@gmail.com",
      password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq",
      role_id: "2"
    },
  ]);

  await knex('comments').insert([
    {
      comment_details: "Comment 1"
    },
    {
      comment_details: "Comment 2"
    },
    {
      comment_details: "Comment 3"
    },
    {
      comment_details: "Comment 4"
    },
    {
      comment_details: "Comment 5"
    },
    {
      comment_details: "Comment 6"
    },
    {
      comment_details: "Comment 7"
    },
    {
      comment_details: "Comment 8"
    },
    {
      comment_details: "Comment 9"
    },
    {
      comment_details: "Comment 10"
    },
    {
      comment_details: "Comment 11"
    },
  ]);

  await knex('posts').insert([
    {
      post_header: "Post Header Sample 1",
      post_details: "Post Details Sample 1",
      post_date: "2023-03-15 14:22:50",
      user_id: "2"
    },
    {
      post_header: "Post Header Sample 2",
      post_details: "Post Details Sample 2",
      post_date: "2023-03-15 14:22:55",
      user_id: "2"
    },
    {
      post_header: "Post Header Sample 3",
      post_details: "Post Details Sample 3",
      post_date: "2023-03-17 14:30:55",
      user_id: "3"
    },
    {
      post_header: "Post Header Sample 4",
      post_details: "Post Details Sample 4",
      post_date: "2023-03-17 14:45:55",
      user_id: "3"
    },
  ]);

  await knex('posts_comments').insert([
    {
      post_id: "1",
      comment_id: "1"
    },
    {
      post_id: "1",
      comment_id: "2"
    },
    {
      post_id: "1",
      comment_id: "3"
    },
    {
      post_id: "1",
      comment_id: "4"
    },
    {
      post_id: "2",
      comment_id: "5"
    },
    {
      post_id: "2",
      comment_id: "6"
    },
    {
      post_id: "2",
      comment_id: "7"
    },
    {
      post_id: "2",
      comment_id: "8"
    },
    {
      post_id: "3",
      comment_id: "9"
    },
    {
      post_id: "3",
      comment_id: "10"
    },
    {
      post_id: "4",
      comment_id: "11"
    },
    {
      post_id: "4",
      comment_id: "1"
    },
  ]);

};
