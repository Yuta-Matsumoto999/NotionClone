const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();
const Color = require("../models/color");

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// 初期投入データ
const colors = JSON.parse(fs.readFileSync(`${__dirname}/data/colors.json`, "utf-8"));

// 初期データの投入
const importData = async () => {
    try {
        await Color.create(colors);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

// 投入データの削除
const deleteData = async () => {
    try {
        await Color.deleteMany();
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

// コマンド引数で処理を指定

/**
 * npm seed -- -i -> importData
 * npm seed -- -d -> deleteData
 */

if (process.argv[2] === "-i") {
    importData();
} else if (process.argv[2] === "-d") {
    deleteData();
}