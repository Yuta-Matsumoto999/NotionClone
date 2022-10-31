const router = require("express").Router();
const projectController = require("../controllers/project");
const tokenHandler = require("../handlers/tokenHandler");

router.post("/", tokenHandler.verifyToken, projectController.create);

module.exports = router;