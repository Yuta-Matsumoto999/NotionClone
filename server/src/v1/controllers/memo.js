const Memo = require("../models/memo");

exports.create = async (req, res) => {
    try {
        // 保存されているメモの個数を取得
        const memoCount = await Memo.find().count();
        // メモ新規作成
        const memo = await Memo.create({ 
            user: req.user._id,
            position: memoCount > 0 ? memoCount : 0,
        });
        res.status(201).json(memo);
    } catch {
        res.status(500).json(err);
    }
};

// ログインしているユーザーのメモを全て取得
exports.getAll = async (req, res) => {
    try {
        const memos = await Memo.find({user: req.user._id}).sort("-position");
        res.status(200).json(memos);
    } catch {
        res.status(500).json(err);
    }
};