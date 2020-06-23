//routes
const session = require("./sesion.route");
const room = require("./room.route");
const user = require("./user.route");
const auth = require("./auth.route");

// middlewares
const authMiddleware = require("../middlewares/auth");

// init rest routes
module.exports = (router) => {
  const prefix = "/api/v1";
  router.use(`${prefix}/sessions`, authMiddleware.isAuthorized, session);
  router.use(`${prefix}/rooms`, authMiddleware.isAuthorized, room);
  router.use(`${prefix}/users`, authMiddleware.isAuthorized, user);
  router.use(`${prefix}/auth`, auth);
};