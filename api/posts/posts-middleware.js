const postModel = require('./post-model');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secret/index');



const roleNameCheckForUpdate = async (req, res, next) => {
    try {
        let post =  await postModel.getPostsByFilter({post_id: req.params.post_id});
        console.log(post[0].user_id);
        console.log(req.decodeToken.subject.toString());
        

        if (req.decodeToken.role_name !== 2 || req.decodeToken.subject.toString() !== post[0].user_id.toString()) {
            res.status(403).json({ message: 'Bu işlemi gerçekleştiremezsiniz'})
        } else {
            req.post = post[0];
            next();
        }
    } catch (error) {
        next(error);
    }
}

const roleNameCheckForPost = async (req, res, next) => {
    try {
        
        console.log(req.body.user_id);
        console.log(req.decodeToken.subject.toString());
        

        if (req.decodeToken.role_name !== 2 || req.decodeToken.subject.toString() !== req.body.user_id) {
            res.status(403).json({ message: 'Bu işlemi gerçekleştiremezsiniz'})
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    roleNameCheckForUpdate,
    roleNameCheckForPost
}