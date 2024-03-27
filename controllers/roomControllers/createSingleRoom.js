import { initSocket } from "../../lib/initSocket.js";
import { Chat } from "../../models/chatModel.js";
import { Room } from "../../models/roomModel.js";
import HandleGlobalError from "../../utils/HandleGlobalError.js";
import catchAsyncError from "../../utils/catchAsyncError.js";
import currentDate from "../../utils/javaScript/currentDate.js";

const createSingleRoom = catchAsyncError(async (req, res, next) => {
  const userId = req.userId;

  const { id, name } = req.body;
  const { io } = initSocket();

  if (!id || id === userId) {
    return next(new HandleGlobalError("Not provided correct ID", 404));
  }

  const members = [id, userId];

  const findRoom = await Room.findOne({ members });

  if (findRoom) {
    return next(new HandleGlobalError("Room is already present", 404));
  }

  const roomCreated = await Room.create({
    members,
  })
    .then((room) =>
      Room.populate(room, { path: "members", select: "_id name email photo" })
    )
    .catch((err) => {
      return next(new HandleGlobalError("Error in Room creation", 404));
    });

  console.log("roomCreated", roomCreated);

  // const promises = [
  //   Chat.create({
  //     room: String(roomCreated._id),
  //     isLabel: true,
  //     label: "Welcome to OnClick Chat App. Enjoy it",
  //   }),
  //   Chat.create({
  //     room: String(roomCreated._id),
  //     isLabel: true,
  //     label: currentDate(),
  //   }),
  // ];

  const defaultChats = await Chat.create({
    room: String(roomCreated._id),
    isLabel: true,
    label: "Welcome to OnClick Chat App. Enjoy it",
  });

  console.log("defaultChats", defaultChats);

  io.emit("singleRoom", { room: roomCreated, chat: [defaultChats] });

  res.status(200).json({
    message: "Room is created",
    room: roomCreated,
    chat: defaultChats,
  });
});

export default createSingleRoom;
