import { Chat } from "../../models/chatModel.js";
import { Room } from "../../models/roomModel.js";
import HandleGlobalError from "../../utils/HandleGlobalError.js";
import catchAsyncError from "../../utils/catchAsyncError.js";
import deleteRoomFunction from "../functions/deleteRoomFunction.js";

const deleteSingleRoom = catchAsyncError(async (req, res, next) => {
  const { id } = req.query;

  console.log("delete room", id);

  if (!id) {
    return next(new HandleGlobalError("room id is not provided", 404));
  }

  await Promise.all([
    Room.deleteOne({ _id: id }),
    Chat.deleteMany({ room: id }),
  ]);

  res.status(200).json({
    message: "Room along with its chats also deleted",
  });
});

export default deleteSingleRoom;
