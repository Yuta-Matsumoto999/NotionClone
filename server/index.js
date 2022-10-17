const express = require("express");
const app = express();
const PORT = 5050;
const mongoose = require("mongoose");
require("dotenv").config();
var cors = require('cors');

// corsエラーの回避設定
app.use(cors({
    origin: "http://localhost:3000",

}))
// json形式を読み込めるように設定
app.use(express.json());

// エンドポイントのdefaultを記述
app.use("/api/v1", require("./src/v1/routes/auth"));

// DB接続
try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("DBと接続中");
} catch (error) {
    console.log("DB Connect Error");
}

app.listen(PORT, () => {
    console.log("ローカルサーバー起動中...");
});