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
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
    }]
});

projectSchema.pre("remove", async function(next) {
    var project = this;

    // projectのtagsの_idを格納
    let deleteTargetProjectTagsId = [];

    project.tags.forEach(async (tag) => {
        deleteTargetProjectTagsId.push(String(tag._id));

        // tagsの子memoの_idを格納
        let deleteTargetProjectTagsChildMemosId = [];

        tag.memos.forEach(async (memo) => {
            deleteTargetProjectTagsChildMemosId.push(String(memo._id));
        });

        // tagの子memoをすべて削除
        await tag.model("Memo").deleteMany({
            _id: {
                $in: deleteTargetProjectTagsChildMemosId
            }
        });
    });

    // projectのtagsをまとめて削除
    await project.model("Tag").deleteMany({
        _id: {
            $in: deleteTargetProjectTagsId
        }
    });

    return next();
})

module.exports = mongoose.model("Project", projectSchema);