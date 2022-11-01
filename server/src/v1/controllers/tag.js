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
            name: name,
            position: tagCount > 0 ? tagCount : 0
        });

        res.status(201).json(newTag);
    } catch (err) {
        res.status(500).json(err);
    }
}