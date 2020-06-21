const User = require("../models/user.model");
const { verifyPassword, Exception, hashPassword } = require("../utils/index");
const { statusCodes } = require("../config/globals");
const { generateAccessToken } = require("../utils/jwt");

module.exports.getAll = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, password, fullname, roleId } = req.body;
    console.log(username, password, fullname, roleId)
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
    next(error)
  }
};