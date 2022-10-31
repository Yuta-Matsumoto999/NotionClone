const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        default: "無題",
    },
    description: {
        type: String,
        default: "ここに自由にプロジェクトの詳細を記載できます。"
    },
    position: {
        type: Number,
        required: true
    },
    icon : {
        type: String,
        default: "✏️",
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    deleted_at: {
        type: Date
    }
});

module.exports = mongoose.model("Project", projectSchema);