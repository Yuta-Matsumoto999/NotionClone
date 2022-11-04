const { findByIdAndUpdate } = require("../models/memo");
const project = require("../models/project");
const Tag = require("../models/tag");

// タグの新規作成
exports.create = async (req, res) => {
    const { projectId } = req.params;
    const { name } = req.body;

    if(name === "") req.body.name = "無題";

    try {
        // プロジェクトに作成されたタグの個数を取得
        const tagCount = await Tag.find({ project: projectId }).count();

        const newTag = await Tag.create({
            project: projectId,
            name: req.body.name,
            position: tagCount > 0 ? tagCount : 0
        });
        
        // タグを追加するプロジェクトを取得
        const existsProject = await project.findOne({ _id: projectId });

        // 取得したプロジェクトのtags配列に新しいtagを追加
        const tags = [...existsProject.tags, newTag._id];

        // タグを追加するプロジェクトのtagsを更新
        const updatedProject = await project.findByIdAndUpdate(projectId, {
            tags: tags
        });

        res.status(201).json(newTag);
    } catch (err) {
        res.status(500).json(err);
    }
}

// タグの更新
exports.update = async (req, res) => {
    const { tagId } = req.params;
    const { name, color, visible, position } = req.body;

    if(name === "") req.body.name = "無題";

    try {
        const updatedTag = await Tag.updateOne({_id: tagId}, {
            name: req.body.name,
            color: req.body.color,
            visible: req.body.visible
        });

        res.status(200).json(updatedTag);
    } catch (err) {
        res.status(500).json(err);
    }
}

// タグの削除
exports.delete = async (req, res) => {
    const { tagId } = req.params;

    try {
        await Tag.findByIdAndDelete(tagId);
        res.status(200).json("タグの削除が完了しました。");
    } catch (err) {
        res.status(500).json(err);
    }
}