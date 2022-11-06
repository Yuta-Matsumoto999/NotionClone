const mongoose = require("mongoose");
const project = require("../models/project");
const memo = require("../models/memo");

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
        ref: "Memo"
    }]
});

// 削除前に関連するObjectを操作する
tagSchema.pre("remove", async function(next) {
    var tag = this;

    // 親projectから削除するtagを取り除く
    await project.updateOne(
        {_id: tag.project},
        {$pull: {tags: tag._id}},
    );

    //　子のmemosをすべて削除する 

    let deleteTargetTagChildMemoIds = [];

    tag.memos.forEach((memo) => {
        deleteTargetTagChildMemoIds.push(String(memo._id));
    });

    await memo.deleteMany({
        _id : {
            $in: deleteTargetTagChildMemoIds
        },
    });

    return next();
});

module.exports = mongoose.model("Tag", tagSchema);