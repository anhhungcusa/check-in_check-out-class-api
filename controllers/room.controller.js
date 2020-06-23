const Room = require("../models/room.model");
const { statusCodes } = require("../config/globals");
const { Exception } = require("../utils");

const createRoom = async (req, res, next) => {
  try {
    const { name } = req.body;
    // check valid
    if (!name) throw new Exception("Name is required!");

    // create session
    const room = new Room({
      name,
    });
    await room.save();
    return res
      .status(statusCodes.OK)
      .send({ room, message: "Create Room Success!" });
  } catch (err) {
    next(err);
  }
};

const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    if (!rooms) throw new Exception("Don't have a room");
    return res.status(statusCodes.OK).json({ rooms });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  createRoom,
  getRooms
};
