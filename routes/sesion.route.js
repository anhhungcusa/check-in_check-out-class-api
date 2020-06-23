const router = require("express").Router();
const controller = require("../controllers/session.controller");

router.post("", controller.createSession);

router.get("", controller.getSessions);

module.exports = router;
