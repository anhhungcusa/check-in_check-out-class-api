//routes
const session = require('./sesion.route');


// init rest routes
module.exports = router => {
    const prefix = "/api/v1"
    router.use(`${prefix}/sessions`, session)
}