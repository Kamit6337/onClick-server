import { UserRoom } from "../../models/userRoomModel.js";
import catchAsyncError from "../../utils/catchAsyncError.js";

const getUserRooms = catchAsyncError(async (req, res, next) => {
  const userId = req.userId;

  const userRooms = await UserRoom.find({
    user: userId,
  });

  res.status(200).json({
    message: "Get User Rooms",
    data: userRooms,
  });
});

export default getUserRooms;
