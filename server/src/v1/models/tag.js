const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        require: true
    },
    name: {
        type: String,
        default: "無題",
    },
    color: {
        type: String,
        default: "#ffe4c4"
    },
    position: {
        type: Number
    },
    visible: {
        type: Boolean,
        default: true
    },
    memos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "memo"
    }]
});

module.exports = mongoose.model("Tag", tagSchema);