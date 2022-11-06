const mongoose = require("mongoose");
const tag = require("../models/tag");

const memoSchema = new mongoose.Schema({
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        required: true
    },
    icon: {
        type: String,
        default: "📝",
    },
    title: {
        type: String,
        default: "無題",
    },
    description: {
        type: String,
        default: "ここに自由に記入してください。"
    },
    position: {
        type: Number,
    },

    favorite: {
        type: Boolean,
        default: false,
    },
    favoritePosition: {
        type: Number,
        default: 0,
    },
}, 
{
    timestamps: true
}
);

memoSchema.pre("remove", async function(next) {
    var memo = this;
    await tag.updateOne(
        {_id: memo.tag},
        {$pull: {memos: memo._id}}
    )
    return next();
})

module.exports = mongoose.model("Memo", memoSchema);