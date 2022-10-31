const router = require("express").Router();
const projectController = require("../controllers/project");
const tokenHandler = require("../handlers/tokenHandler");

// プロジェクト新規作成
router.post("/", tokenHandler.verifyToken, projectController.create);

// ログインしているユーザーのプロジェクトを全て取得
router.get("/", tokenHandler.verifyToken, projectController.getAll);

// プロジェクトを個別に取得
router.get("/:projectId", tokenHandler.verifyToken, projectController.getOne);

// プロジェクトの更新
router.put("/:projectId", tokenHandler.verifyToken, projectController.update);

// プロジェクトの削除
router.post("/destroy/:projectId", tokenHandler.verifyToken, projectController.destroy);

module.exports = router;