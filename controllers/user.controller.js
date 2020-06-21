const User = require('../models/user.model')
const { statusCodes } = require('../config/globals')
const { getToken } = require('../utils/index')
const bcrypt = require('bcrypt');


module.exports.getAll = async (req, res) => {
    const users = await User.find()
    res.status(200).json(users)
}

module.exports.register = async (req, res) => {
    try {
        const hassPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            username: req.body.username,
            password: hassPassword,
            fullname: req.body.fullname,
            roleId: req.body.roleId
        })
        const newUser = await user.save()
        if (newUser) {
            return res.status(statusCodes.OK).json({
                _id: newUser._id,
                username: newUser.username,
                fullname: newUser.fullname,
                roleId: newUser.roleId,
                token: getToken(newUser)
            })
        }
    } catch (error) {
        res.status(statusCodes.BAD_REQUEST).json({
            message: "Invalid User Data"
        })
    }
}

module.exports.login = async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
        return res.status(statusCodes.NOT_FOUND).json({
            message: "User not Exist!"
        })
    } else {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (result) {
                res.status(statusCodes.OK).json({
                    _id: user._id,
                    username: user.username,
                    fullname: user.fullname,
                    roleId: user.roleId,
                    token: getToken(user)
                })
            } else {
                res.status(401).json({
                    message: "Auth failed"
                })
            }
        })
    }
}