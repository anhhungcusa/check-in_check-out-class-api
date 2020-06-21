const jwt = require('jsonwebtoken');
const {env} = require('../config/globals')

const getToken = (user)=>{
    return jwt.sign({
        _id: user._id,
        username: user.username,
        fullname: user.fullname,
        roleId: user.roleId,
    },env.JWT_SECRET_KEY,{
        expiresIn: '12h'
    })
}

module.exports = {
    getToken
}