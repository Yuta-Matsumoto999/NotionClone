const Memo = require("../models/memo");

exports.create = async (req, res) => {
    try {
        // 保存されているメモの個数を取得
        const memoCount = await Memo.find().count();
        // メモ新規作成
        const memo = Memo.create({ 
            user: req.user._id,
            position: memoCount > 0 ? memoCount : 0,
        });
        res.status(201).json(memo);
    } catch {
        res.status(500).json(err);
    }
};