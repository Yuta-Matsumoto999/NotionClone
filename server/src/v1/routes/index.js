const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/memo", require("./memo"));
router.use("/project", require("./project"));
router.use("/tag", require("./tag"));

module.exports = router;