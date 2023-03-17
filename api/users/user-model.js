const db = require('../../data/db-config');
const knex = require('knex');

async function getAllUsers () {
    const allUsers = await db('users as u')
                            .leftJoin('roles as r', 'u.role_id', 'r.role_id')
                            .select('u.user_id', 'u.name', 'u.username', 'u.email','r.role_name');

    return allUsers;
}

async function getUsersById (user_id) {
    const user = await db('users as u')
                            .leftJoin('roles as r', 'u.role_id', 'r.role_id')
                            .select('u.user_id', 'u.name', 'u.username', 'u.email','r.role_name')
                            .where('u.user_id', user_id).first();

    return user;
}

async function getUsersByFilter (filter) {
    const user = await db('users as u')
                            .where(filter).first();

    return user;
}

async function insertUser (user) {
    const [willBeInsertedUserId] = await db('users').insert(user);    
    console.log(willBeInsertedUserId);
    console.log(await getUsersById(willBeInsertedUserId));
    return await getUsersById(willBeInsertedUserId); 
}

async function updateUser (user, user_id) {
    await db('users').where('user_id', user_id).update(user);
    return await getUsersById(user_id);
}

async function deleteUser (user_id) {
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