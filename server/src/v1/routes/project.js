const router = require("express").Router();
const projectController = require("../controllers/project");
const tokenHandler = require("../handlers/tokenHandler");

// プロジェクト新規作成
router.post("/", tokenHandler.verifyToken, projectController.create);

// ログインしているユーザーのプロジェクトを全て取得
router.get("/", tokenHandler.verifyToken, projectController.getAll);

module.exports = router;