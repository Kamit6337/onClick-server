import catchAsyncError from "../../utils/catchAsyncError.js";
import { Room } from "../../models/roomModel.js";
import HandleGlobalError from "../../utils/HandleGlobalError.js";
import { initSocket } from "../../lib/initSocket.js";
import deleteRoomFunction from "../functions/deleteRoomFunction.js";
import path from "path";
import fs from "fs";

const leaveGroupRoom = catchAsyncError(async (req, res, next) => {
  const userId = req.userId;
  const { io } = initSocket();

  const { id } = req.query;

  console.log("delete room", id);

  if (!id) {
    return next(new HandleGlobalError("room id is not provided", 404));
  }

  const findRoom = await Room.findOne({
    _id: id,
    admin: userId,
  });

  if (findRoom) {
    return next(
      new HandleGlobalError(
        "You are Admin. You can't leave, you have to delete the Chat",
        404
      )
    );
  }

  await Room.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $pull: { members: userId },
    }
  );

  io.emit("deleteRoom", { members: findRoom.members }, (response) => {
    if (response.status !== "ok") {
      console.log("response from delete room", response);
    }
  });

  res.status(200).json({
    message: "You are removed from the group",
  });

  res.status(200).json({
    message: "Group chat successfully deleted along with its chats",
  });
});

export default leaveGroupRoom;
