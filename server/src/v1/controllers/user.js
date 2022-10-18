const User = require("../models/user");
const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {

    // パスワードの受け取り
    const password = req.body.password;

    try {
        // パスワードの暗号化
        req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);

        // ユーザーの新規登録
        const user = await User.create(req.body);

        // JWTの発行
        const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
            expiresIn: "24h",
        });

        return res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json(err);
    }
}

exports.login = async (req, res) => {

    const {username, password} = req.body;
    try {
        // DBからuerの存在を探す
        const user = await User.findOne({username: username});
        
        if(!user) {
            return res.status(401).json({
                errors: [
                    {
                        param: "username",
                        msg: "ユーザーが無効です。"
                    }
                ]
            })
        }

        // パスワードの照合
        const decryptedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.TOKEN_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);
        
        if(decryptedPassword !== password) {
            return res.status(401).json({
                errors: [
                    {
                        param: "password",
                        msg: "パスワードが無効です。"
                    }
                ]
            });
        }

        // JWTを発行
        const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
            expiresIn: "24h",
        });
        return res.status(201).json({user, token});

    } catch (err) {
        return res.status(500).json(err);
    }
}