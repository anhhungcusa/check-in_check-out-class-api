const User = require("../models/user.model");
const { verifyPassword, Exception, hashPassword } = require("../utils/index");
const { statusCodes } = require("../config/globals");
const { generateAccessToken } = require("../utils/jwt");

module.exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) throw new Exception("Don't have a user");
    return res.status(statusCodes.OK).json({ users, message: "Get Users Success!" });
  } catch (err) {
    next(err);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, password, fullname, roleId } = req.body;
    console.log(username, password, fullname, roleId);
    // check exist username
    const isExistedUsername = await User.exists({ username });
    if (isExistedUsername) throw new Exception("Email existed");

    const hassPassword = await hashPassword(password);
    const user = new User({
      username,
      password: hassPassword,
      fullname,
      roleId,
    });
    await user.save();
    delete user._doc.password;

    return res.status(statusCodes.OK).send({
      user,
      message: "Create User Role Student Success!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (user) {
      await user.remove()
      res.status(statusCodes.OK).send({
        message: "Delete User Success"
      })
    }
  } catch (error) {
    res.status(statusCodes.NOT_FOUND).send({
      message: "User doesn't exist!"
    })
  }
}
