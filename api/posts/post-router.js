const router = require('express').Router();
const postModel = require('./post-model');
const mdAuth = require('../auth/auth-middleware');
const md = require('./posts-middleware');

router.get("/", async (req, res, next) => {
    try {
        let posts = await postModel.getAllPosts();
        res.json(posts)
    } catch (error) {
        next(error);
    }
})

router.get("/:post_id", async (req, res, next) => {
    try {
        let posts = await postModel.getPostsById(req.params.post_id);
        res.json(posts)
    } catch (error) {
        next(error);
    }
})


router.post("/", md.roleNameCheckForPost, async (req, res, next) => {
    try {
        const {post_header, post_details} = req.body;
        if(!post_header || !post_details) {
            res.status(400).json({ message: 'Girdiğiniz bilgiler eksik' });
        } else {
            const newPost = {
                post_header: req.body.post_header,
                post_details: req.body.post_details,
                post_date: new Date().toLocaleString(),
                user_id: req.body.user_id
            }
            let willBeInsertedPost = await postModel.insertPost(newPost);
            console.log("eklenecek id",willBeInsertedPost);
            res.status(201).json(willBeInsertedPost);
        }
    } catch (error) {
        next(error);
    }
})

router.put("/:post_id", md.roleNameCheckForUpdate, async (req, res, next) => {
    try {
        const newPost = {
            post_header: req.body.post_header,
            post_details: req.body.post_details,
            post_date: new Date().toLocaleString(),
            user_id: req.post.user_id // düzelt
        }
        let willBeUpdatedPost = await postModel.updatePost(newPost, req.params.post_id);
        res.json(willBeUpdatedPost);
    } catch (error) {
        next(error);
    }
})

router.delete("/:post_id", md.roleNameCheckForUpdate, async (req, res, next) => {
    try {
        await postModel.deletePost(req.params.post_id);
        res.json({message: 'Post\'unuz başarıyla silindi'});
    } catch (error) {
        next(error);
    }
})


module.exports = router;