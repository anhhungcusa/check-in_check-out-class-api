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
    return res.status(statusCodes.OK).json({ rooms, message: "Get Rooms Success!" });
  } catch (err) {
    next(err);
  }
};

const deleteRoomById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new Exception("Id is required!");
    const result = await Room.findByIdAndDelete(id);
    if (!result) throw new Exception("Room Don't Exist!");
    return res
      .status(statusCodes.OK)
      .send({ message: `Delete Room - ${id} Success!` });
  } catch (err) {
    next(err);
  }
};

const editRoomById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!id) throw new Exception("Id is requireed!");
    const room = await Room.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!room) throw new Exception(`Not Found Room - ${id}`);
    return res
      .status(statusCodes.OK)
      .send({ room, message: `Edit Room-${id} Success!` });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRoom,
  getRooms,
  deleteRoomById,
  editRoomById
};
