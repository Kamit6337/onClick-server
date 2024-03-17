import catchAsyncError from "../../utils/catchAsyncError.js";
import { Room } from "../../models/roomModel.js";
import HandleGlobalError from "../../utils/HandleGlobalError.js";
import { Chat } from "../../models/chatModel.js";

const getUserRooms = catchAsyncError(async (req, res, next) => {
  const userId = req.userId;

  let rooms = await Room.find({ members: { $in: [userId] } })
    .lean()
    .populate({
      path: "members",
      select: "_id name email photo",
    })
    .sort("-updatedAt");

  if (!rooms) {
    return next(new HandleGlobalError("Error in getting rooms", 404));
  }

  if (rooms.length === 0) {
    res.status(200).json({
      message: "No Room availbale",
      rooms: [],
      chats: [],
    });
    return;
  }

  const roomsId = rooms.map((room) => room._id);

  const chats = await Chat.find({ room: { $in: [...roomsId] } })
    .lean()
    .populate({
      path: "sender",
      select: "_id name email photo",
    })
    .sort("+updatedAt");

  res.status(200).json({
    message: "User rooms",
    rooms: rooms,
    chats: chats,
  });
});

export default getUserRooms;
