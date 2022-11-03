const Color = require("../models/color");
const project = require("../models/project");

// カラーを全件取得
exports.getAll = async (req, res) => {
    try {
        const colors = await Color.find({});
        res.status(200).json(colors);
    } catch (err) {
        resizeBy.status(500).json(err);
    }
}