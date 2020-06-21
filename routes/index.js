//routes
const session = require('./sesion.route');
const room = require('./room.route');


// init rest routes
module.exports = router => {
    const prefix = "/api/v1"
    router.use(`${prefix}/sessions`, session)
    router.use(`${prefix}/rooms`, room)
}