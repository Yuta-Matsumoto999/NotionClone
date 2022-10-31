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

        res.status(201).json(newProject);
    } catch (err) {
        res.status(500).json(err);
    }
}

// ログインしているユーザーのプロジェクトを全件取得
exports.getAll = async (req, res) => {
    try {
        const projects = await Project.find({user: req.user._id});
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json(err);
    }
}