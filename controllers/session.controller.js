const Session = require("../models/session.model");
const { statusCodes } = require("../config/globals");
const { Exception } = require("../utils");

const createSession = async (req, res, next) => {
  try {
    const { startAt, endAt, name, hostId, roomId } = req.body;
    // check valid
    if (!startAt || !endAt || !name || !hostId || !roomId)
      throw new Exception("A field invalid. Please check again!");

    // create session
    const session = new Session({
      startAt,
      endAt,
      name,
      hostId,
      roomId,
    });
    await session.save();
    return res
      .status(statusCodes.OK)
      .send({ session, message: "Create Session Success!" });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  createSession,
};
