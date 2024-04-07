import { initSocket } from "../../lib/initSocket.js";
import { Chat } from "../../models/chatModel.js";
import { Room } from "../../models/roomModel.js";
import catchAsyncError from "../../utils/catchAsyncError.js";

const createChatMsg = catchAsyncError(async (req, res, next) => {
  const { io } = initSocket();
  const { room, message } = req.body;

  const chatObj = {
    room,
    message,
    sender: userId,
  };

  const promises = [
    Chat.create(chatObj),
    Room.findOneAndUpdate(
      {
        _id: room,
      },
      {
        updatedAt: Date.now(),
      }
    ),
  ];

  const [createChat] = await Promise.all(promises);

  createChat.sender = user;

  io.to(room).emit("addChatMsg", createChat);

  res.json({
    message: "Chat msg send successfully",
  });
});

export default createChatMsg;
