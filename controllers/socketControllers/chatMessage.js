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
