const db = require('../../data/db-config');
const knex = require('knex');

let allPostsIds;
let postNumber;

async function getAllPosts() {
    const allPosts = await db('posts as p')
        .leftJoin('users as u', 'u.user_id', 'p.user_id')
        .leftJoin('posts_comments as pc', 'p.post_id', 'pc.post_id')
        .leftJoin('comments as c', 'c.comment_id', 'pc.comment_id')
        .select('p.post_id', 'u.user_id', 'u.name', 'u.username', 'p.post_header', 'p.post_details', 'p.post_date', 'c.comment_details');


    allPostsIds = [];

    allPosts.map(post => {
        allPostsIds.push(post.post_id);
    });

    function countUnique(iterable) {
        return new Set(iterable).size;
    }

    postNumber = countUnique(allPostsIds);

    let posts = [];
    for (let i = 1; i <= postNumber; i++) {
        let post = await getPostsById(i);
        posts.push(post)
    }

    return posts;

}


async function getPostsById(post_id) {

    const post = await db('posts as p')
        .leftJoin('users as u', 'u.user_id', 'p.user_id')
        .leftJoin('posts_comments as pc', 'p.post_id', 'pc.post_id')
        .leftJoin('comments as c', 'c.comment_id', 'pc.comment_id')
        .select('p.post_id', 'u.user_id', 'u.name', 'u.username', 'p.post_header', 'p.post_details', 'p.post_date', 'c.comment_details')
        .where('p.post_id', post_id);

    const responseData = {
        post_id: parseInt(post_id),
        user_id: post[0].user_id,
        name: post[0].name,
        username: post[0].username,
        post_header: post[0].post_header,
        post_details: post[0].post_details,
        post_date: post[0].post_date,
        comments: []
    }

    if (post[0].comment_details === null) {
        return responseData;
    } else {
        console.log(post);
        post.forEach((item) => {
            responseData.comments.push({
                "comment_details": item.comment_details
            });
        });
        return responseData;
    }

}

async function getPostsByFilter(filter) {

    const post = await db('posts').where(filter);
    return post;
}



async function insertPost(post) {
    const [willBeInsertedPostId] = await db('posts').insert(post);
    return await getPostsById(willBeInsertedPostId);
}

async function updatePost(post, post_id) {
    await db('posts').where('post_id', post_id).update(post);
    return await getPostsById(post_id);
}

async function deletePost(post_id) {
    return await db('posts').where('post_id', post_id).delete();
}


module.exports = {
    getAllPosts,
    getPostsById,
    getPostsByFilter,
    insertPost,
    updatePost,
    deletePost
}