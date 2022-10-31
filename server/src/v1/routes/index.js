const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/memo", require("./memo"));
router.use("/project", require("./project"));

module.exports = router;