const router = require("express").Router();
const controller = require("../controllers/session.controller");

router.post("", controller.createSession);

router.get("", controller.getSessions);

router.get("/:id", controller.getSessionById);

router.delete("/:id", controller.deleteSessionById);

router.post("/:id", controller.editSessionById);

module.exports = router;
