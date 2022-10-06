const router = require("express").Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const validation = require("../handlers/validation")
const userController = require("../controllers/user");
require("dotenv").config();


// ユーザー新規登録用API
router.post(
    "/register", 
    body("username").isLength({ min: 8 }).withMessage("ユーザー名は、8文字以上である必要があります。"),
    body("password").isLength({ min: 8 }).withMessage("パスワードは、8文字以上である必要があります。"),
    body("confirmPassword").isLength({ min: 8 }).withMessage("確認用パスワードは、8文字以上である必要があります。"),
    body("username").custom((value) => {
        return  User.findOne({ username: value }).then((user) => {
            if(user) {
                return Promise.reject("このユーザーは既に使われています。");
            }
        });
    }),
    validation.validate,
    userController.register
);

// ユーザーログイン用API
router.post(
    "/login",
    body("username").isLength({ min: 8 }).withMessage("ユーザー名は、8文字以上である必要があります。"),
    body("password").isLength({ min: 8 }).withMessage("パスワードは、8文字以上である必要があります。"),
    validation.validate,
    userController.login
);

module.exports = router;