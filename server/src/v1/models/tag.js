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
        ref: "Memo"
    }]
});

// 削除前に関連するObjectを操作する
tagSchema.pre("remove", async function(next) {
    var tag = this;

    // 親projectから削除するtagを取り除く
    await tag.model("Project").updateOne(
        {_id: tag.project},
        {$pull: {tags: tag._id}},
    );

    //　子のmemosをすべて削除する 

    let deleteTargetTagChildMemoIds = [];

    tag.memos.forEach((memo) => {
        deleteTargetTagChildMemoIds.push(String(memo._id));
    });

    await tag.model("Memo").deleteMany({
        _id : {
            $in: deleteTargetTagChildMemoIds
        },
    });

    return next();
});

module.exports = mongoose.model("Tag", tagSchema);