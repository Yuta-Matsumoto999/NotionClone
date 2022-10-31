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

// プロジェクトを個別に取得
exports.getOne = async (req, res) => {
    const { projectId } = req.params;

    try {
        const project = await Project.findOne({user: req.user._id, _id: projectId});

        if(!project) return res.status(404).json("プロジェクトが存在しません。");

        res.status(200).json(project);
    } catch (err) {
        res.status(500).json(err);
    }
}