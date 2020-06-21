//routes
const session = require('./sesion.route');
const room = require('./room.route');
const user = require('./user.route');
const auth = require('./auth.route');



// init rest routes
module.exports = router => {
    const prefix = "/api/v1"
    router.use(`${prefix}/sessions`, session)
    router.use(`${prefix}/rooms`, room)
    router.use(`${prefix}/users`, user)
    router.use(`${prefix}/auth`, auth)
}