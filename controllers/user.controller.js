const User = require('../models/user.model')
const { Exception } = require('../utils/index')
const { generateAccessToken } = require('../utils/jwt')
const { statusCodes, env } = require('../config/globals')
const Role = require('../models/role.model')
const {
  Types: { ObjectId },
} = require('mongoose')

module.exports.getAll = async (req, res, next) => {
  try {
    let users = await User.find().populate('role')
    users = users.map((user) => {
      delete user._doc.password
      return { ...user._doc,
        role: user.role }
    })
    if (users.length === 0) throw new Exception('users not found')
    return res
      .status(statusCodes.OK)
      .json({ users,
        message: 'Get Users Success!' })
  } catch (err) {
    next(err)
  }
}

module.exports.register = async (req, res, next) => {
  try {
    let { username, fullname, password, role: roleName = 'student' } = req.body
    const isExistedUsername = await User.exists({ username })
    if (isExistedUsername) throw new Exception('username is existed')
    const role = await Role.findOne({ name: roleName })
    if (!role) throw new Exception(`${roleName} role not found`)
    const roleId = role._id
    const user = new User({
      username,
      fullname,
      password,
      roleId,
    })
    await user.save()
    return res
      .status(statusCodes.OK)
      .send({ message: 'register account successful' })
  } catch (error) {
    next(error)
  }
}

module.exports.updateUser = async (req, res, next) => {
  try {
    const { username, fullname } = req.body
    const { id } = req.params
    const user = await User.findById(id, {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    })
    if (!user) throw new Exception('User doesn\'t exist!')
    user.username = username
    user.fullname = fullname
    await user.save()
    delete user._doc.password
    delete user._doc.roleId
    return res.status(statusCodes.OK).send({
      user,
      message: 'User Updated!',
    })
  } catch (error) {
    next(error)
  }
}

module.exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!ObjectId.isValid(id)) throw new Exception('user id is not valid')
    const user = await User.findById(req.params.id)
    if (!user) {
      throw new Exception('User doesn\'t exist!')
    } else {
      await user.remove()
      res.status(statusCodes.OK).send({
        message: 'Delete User Success',
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!ObjectId.isValid(id)) throw new Exception('UserId is not valid')
    const user = await User.findById(id)
    if (!user) throw new Exception('User not exist!')
    return res
      .status(statusCodes.OK)
      .send({ user,
        message: 'Get User Success!' })
  } catch (err) {
    next(err)
  }
}

module.exports.changePassword = async (req, res, next) => {
  try {
    const { password } = req.body
    const { id } = req.params
    const user = await User.findById(id, {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    })
    user.password = password
    user.save()
    if (!user) throw new Exception('User doesn\'t exist!')
    return res.status(statusCodes.OK).send({
      message: 'Change Password Success!',
    })
  } catch (error) {
    next(error)
  }
}

module.exports.requireAcceptToekn = async (req, res, next) => {
  try {
    const { _id, username, fullname, role } = req.body
    const token = await generateAccessToken(
      { _id,
        username,
        fullname,
        role },
      env.JWT_SECRET_KEY,
      '2d'
    )
    return res
      .status(statusCodes.OK)
      .send({ token,
        message: 'Required Success!' })
  } catch (error) {
    next(error)
  }
}
