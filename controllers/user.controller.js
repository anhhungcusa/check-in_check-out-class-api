const User = require("../models/user.model");
const { Exception } = require("../utils/index");
const { statusCodes } = require("../config/globals");
const Role = require('../models/role.model')

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
		let { username, fullname, password, roleId } = req.body;
		const isExistedUsername  = await User.exists({ username })
		if (isExistedUsername) throw new Exception('username is existed');
    if(!roleId) {
      const studentRole = await Role.findOne({name: 'student'})
      if(!studentRole) throw new Exception('student role not found')
      roleId = studentRole._id
    }
		const user = new User({ username, fullname, password, roleId });
    await user.save();
		return res.status(statusCodes.OK).send({message: 'register account successful'});
	} catch (error) {
		next(error);
	}
};


module.exports.updateUser = async (req,res, next)=>{
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body)
    if (!user) throw new Exception("User doesn't exist!")
    res.status(statusCodes.OK).send({
      message: "User Updated!"
    })
  } catch (error) {
    next(error)
  }
}

module.exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {throw new Exception("User doesn't exist!")}
    else{
      await user.remove()
      res.status(statusCodes.OK).send({
        message: "Delete User Success"
      })
    }
  } catch (error) {
    next(error)
  }
}
