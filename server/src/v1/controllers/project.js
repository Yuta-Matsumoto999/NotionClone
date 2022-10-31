const Project = require("../models/project");

// プロジェクトの新規作成
exports.create = async (req, res) => {
    try {
        // ログインしているユーザーが作成したプロジェクトの個数を取得
        const projectCount = await Project.find({ user:req.user._id }).count();
        const newProject = await Project.create({
            user: req.user._id,
            position: projectCount > 0 ? projectCount : 0,
        });

        res.status(401).json({newProject});
    } catch (err) {
        res.status(500).json(err);
    }
}