const router = require("express").Router();
const Memo = require("../models/memo");
const memoController = require("../controllers/memo");
const tokenHandler = require("../handlers/tokenHandler");

// メモの新規作成
router.post("/:tagId", tokenHandler.verifyToken, memoController.create);

// ログインしているユーザーのメモを全て取得
router.get("/", tokenHandler.verifyToken, memoController.getAll);

//  ログインしているユーザーのメモを1つ取得
router.get("/:memoId", tokenHandler.verifyToken, memoController.getOne);

// メモを更新
router.put("/:memoId", tokenHandler.verifyToken, memoController.update);

// メモを削除
router.delete("/:memoId", tokenHandler.verifyToken, memoController.delete);

// tagごとにメモを取得
router.get("/byTag/:tagId", tokenHandler.verifyToken, memoController.getAllByTagId);

module.exports = router;

