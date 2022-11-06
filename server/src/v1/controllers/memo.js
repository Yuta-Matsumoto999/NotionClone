const Memo = require("../models/memo");
const Tag = require("../models/tag");

exports.create = async (req, res) => {
    const { tagId } = req.params;

    try {
        // 保存されているメモの個数を取得
        const memoCount = await Memo.find({tag: tagId}).count();

        // メモ新規作成
        const newMemo = await Memo.create({ 
            tag: tagId,
            position: memoCount > 0 ? memoCount : 0,
        });

         // メモを追加するタグを取得
        const existsTag = await Tag.findOne({ _id: tagId });

        // 取得したプロジェクトのmemos配列に新しいmemoを追加
        const memos = [...existsTag.memos, newMemo._id];

        // タグを追加するプロジェクトのtagsを更新
        const updatedTag = await Tag.findByIdAndUpdate(tagId, {
            memos: memos
        });

        res.status(201).json(newMemo);
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

// メモの詳細を個別に取得する
exports.getOne = async (req, res) => {
    const { memoId } = req.params;

    try {
        const memo = await Memo.findOne({ user: req.user._id, _id: memoId });

        if(!memo) return res.status(404).json("メモが存在しません。");
        res.status(200).json(memo);
    } catch (err) {
        res.status(500).json(err);
    }
}

// メモを更新する
exports.update = async (req, res) => {
    const { memoId } = req.params;
    const { title, description } = req.body;

    try {

        if(title === "") req.body.title = "無題";
        if(description === "") req.body.description = "ここに自由に記入してください。";

        const memo = await Memo.findOne({ user: req.user._id, id: memoId });

        if(!memo) return res.status(404).json("メモが存在しません。");

        const updatedMemo = await Memo.findByIdAndUpdate(memoId, {
            $set: req.body,
        });

        res.status(200).json(updatedMemo);
    } catch (err) {
        res.status(500).json(err);
    }
}

// メモを削除する
exports.delete = async (req, res) => {
    const { memoId } = req.params;

    try {
        const deleteTargetMemo = await Memo.findOne({ user: req.user._id, _id: memoId });

        if(!deleteTargetMemo) return res.status(404).json("メモが存在しません。");

        deleteTargetMemo.remove();

        res.status(200).json("メモを削除しました。");
    } catch (err) {
        res.status(500).json(err);
    }
}

// メモをタグごとに全件取得
exports.getAllByTagId = async (req, res) => {
    const { tagId } = req.params;
    
    try {
        const memos = await Memo.find({ tag: tagId });

        res.status(200).json(memos);
    } catch (err) {
        res.status(500).json(err);
    }
}