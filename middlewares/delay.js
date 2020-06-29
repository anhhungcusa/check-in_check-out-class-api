
const delay = ms => async (req, res, next) => {
    await new Promise(rs => {
        setTimeout(() => {
            rs()
        }, ms)
    })
    next()
}

module.exports = delay