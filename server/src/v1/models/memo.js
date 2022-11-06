const mongoose = require("mongoose");
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
});

module.exports = mongoose.model("Memo", memoSchema);