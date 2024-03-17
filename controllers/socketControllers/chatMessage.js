import { Chat } from "../../models/chatModel.js";
import { Room } from "../../models/roomModel.js";

const chatMessage = (io, socket) => {
  socket.on("chatMessage", async (arg, callback) => {
    const userId = socket.userId;
    const user = socket.user;

    const { room, message } = arg;

    console.log("arg", arg);
    try {
      const chatObj = {
        room,
        message,
        sender: userId,
      };

      // const createChat = await Chat.create(chatObj);

      // await Room.findOneAndUpdate(
      //   {
      //     _id: room,
      //   },
      //   {
      //     updatedAt: Date.now(),
      //   }
      // );

      if (!chatObj) {
        console.log("Error in chat creation");
        return;
      }

      chatObj.sender = user;

      io.to(room).emit("chatMessage", createChat, (err) => {
        if (err) {
          console.log(err);
        }
      });

      callback({ status: "ok" });
    } catch (error) {
      callback({ error: error.message });
      console.log("error", error);
    }
  });
};

export default chatMessage;
