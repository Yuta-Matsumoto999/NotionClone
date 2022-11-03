const router = require("express").Router();
const tagController = require("../controllers/tag");
const tokenHandler = require("../handlers/tokenHandler");

// タグ新規登録
router.post("/:projectId", tokenHandler.verifyToken, tagController.create);

// タグ更新
router.put("/:tagId", tokenHandler.verifyToken, tagController.update);

module.exports = router;