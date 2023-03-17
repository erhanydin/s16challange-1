const db = require('../../data/db-config');
const knex = require('knex');

async function getAllPosts () {
    const allPosts = await db('posts as p')
                            .leftJoin('users as u', 'u.user_id', 'p.user_id')
                            .select('p.post_id' ,'u.user_id', 'u.name', 'u.username', 'p.post_header','p.post_details', "p.post_date");

    return allPosts;
}

async function getPostsById (user_id) {
    const post = await db('posts as p')
                            .leftJoin('users as u', 'u.user_id', 'p.user_id')
                            .select('p.post_id' ,'u.user_id', 'u.name', 'u.username', 'p.post_header','p.post_details', "p.post_date")
                            .where('u.user_id', user_id).first();

    return post;
}

async function getPostsByFilter (filter) {
    const post = await db('posts as p')
                            .where(filter).first();

    return post;
}

async function insertPost (user) {
    const [willBeInsertedUserId] = await db('users').insert(user);    
    console.log(willBeInsertedUserId);
    console.log(await getUsersById(willBeInsertedUserId));
    return await getUsersById(willBeInsertedUserId); 
}

async function updatePost (user, user_id) {
    await db('users').where('user_id', user_id).update(user);
    return await getUsersById(user_id);
}

async function deletePost (user_id) {
    return await db('users').where('user_id', user_id).delete();
}


module.exports = {
    getAllUsers,
    getUsersById,
    getUsersByFilter,
    insertUser,
    updateUser,
    deleteUser
}