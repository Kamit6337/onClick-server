import express from "express";
import getUserRooms from "../controllers/roomControllers/getUserRooms.js";
import createGroupRoom from "../controllers/roomControllers/createGroupRoom.js";
import createSingleRoom from "../controllers/roomControllers/createSingleRoom.js";
import { groupChatProfileUpload } from "../lib/multerSetup.js";
import updateGroupRoom from "../controllers/roomControllers/updateGroupRoom.js";
import deleteSingleRoom from "../controllers/roomControllers/deleteSingleRoom.js";
import leaveGroupRoom from "../controllers/roomControllers/leaveGroupRoom.js";

const router = express.Router();

// MARK: GET USER ROOMS
router.route("/").get(getUserRooms).delete(deleteSingleRoom);

// MARK: LEAVE GROUP CHAT

router.delete("/leave", leaveGroupRoom);

// MARK: CREATE
/* prettier-ignore */
router
.post("/single", createSingleRoom)

// MARK: CREATE AND DELETE GROUP CHAT
router
  .route("/group")
  .post(groupChatProfileUpload.single("image"), createGroupRoom)
  .patch(groupChatProfileUpload.single("image"), updateGroupRoom);

export default router;
