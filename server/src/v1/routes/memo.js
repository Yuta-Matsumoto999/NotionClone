const router = require("express").Router();
const Memo = require("../models/memo");
const memoController = require("../controllers/memo");
const tokenHandler = require("../handlers/tokenHandler");

// メモの新規作成
router.post("/", tokenHandler.verifyToken, memoController.create);

// ログインしているユーザーのメモを全て取得
router.get("/", tokenHandler.verifyToken, memoController.getAll);

//  ログインしているユーザーのメモを1つ取得
router.get("/:memoId", tokenHandler.verifyToken, memoController.getOne);

module.exports = router;
