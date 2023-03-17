const userModel = require('../users/user-model');

const { JWT_SECRET } = require('../secret/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const payloadCheck = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: 'Girdiğiniz bilgiler eksik' });
        } else {
            req.encPassword = await bcrypt.hash(password, 8);
            next();
        }
    } catch (error) {
        next(error);
    }
}

const usernameCheck = async (req, res, next) => {
    try {
        const { username } = req.body;
        let isUsernameExist = await userModel.getUsersByFilter({ username: username });
        if (isUsernameExist) {
            res.status(401).json({ message: 'Bu username zaten kullanılıyor' });
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}

const passwordCheck = async (req, res, next) => {
    try {
        let user = await userModel.getUsersByFilter({ username: req.body.username });
        if (!user) {
            res.status(401).json({ message: 'Girdiğiniz bilgiler yanlış' });
        } else {
            let isPasswordTrue = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordTrue) {
                res.status(401).json({ message: 'Girdiğiniz bilgiler yanlış' })
            } else {
                req.user = user;
                next();
            }
        }
    } catch (error) {
        next(error);
    }
}

const tokenCheck = async (req, res, next) => {
    try {
        let header = req.headers["authorization"];
        if (!header) {
            res.status(401).json({ message: "Token bulunamadı" });
        } else {
            const jwtvr = jwt.verify(header, JWT_SECRET, (err, decode) => {
                if (err) {
                    res.status(401).json({ message: "Token geçersizdir" });
                } else {
                    req.decodeToken = decode;
                    // console.log(req.decodeToken);
                    // console.log(req.decodeToken.subject);
                    next();
                }
            })
        }
    } catch (error) {
        next(error)
    }
}

const roleNameCheck = async (req, res, next) => {
    try {
        if (req.decodeToken.role_name !== 'admin') {
            res.status(403).json({ message: 'Bu işlemi gerçekleştiremezsiniz'})
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}

const userPutDelete = async (req, res, next) => {
    try {
        console.log(typeof req.decodeToken.subject.toString());
        console.log(typeof req.params.user_id);        
        if (req.decodeToken.subject.toString() === req.params.user_id) {
            next();
        } else {
            res.status(403).json({ message: 'Bu işlemi gerçekleştiremezsiniz' })
        }
    } catch (error) {
        next(error);
    }
}

const emailValidation = async (req, res, next) => {
    const emailCheck = req.body.email.toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    if(!emailCheck) {
        res.status(400).json({message: 'Lütfen geçerli bir email adresi giriniz'})
    } else {
        next();
    }   
}

const emailCheck = async (req, res, next) => {
    try {
        const { email } = req.body;
        let isEmailExist = await userModel.getUsersByFilter({ email: email });
        if (isEmailExist) {
            res.status(401).json({ message: 'Bu email adresi zaten kullanılıyor' });
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}


module.exports = {
    payloadCheck,
    usernameCheck,
    passwordCheck,
    tokenCheck,
    roleNameCheck,
    emailValidation,
    emailCheck,
    userPutDelete
}