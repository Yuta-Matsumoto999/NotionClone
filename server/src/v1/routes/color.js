const tokenHandler = require("../handlers/tokenHandler");
const colorController = require("../controllers/color");

const router = require("express").Router();

// そのプロジェクトに作成されたカラー全件取得
router.get("/", tokenHandler.verifyToken, colorController.getAll);

module.exports = router;