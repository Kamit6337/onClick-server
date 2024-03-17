import express from "express";
import getUserRooms from "../controllers/roomControllers/getUserRooms.js";
import createGroupRoom from "../controllers/roomControllers/createGroupRoom.js";
import createSingleRoom from "../controllers/roomControllers/createSingleRoom.js";
import { groupChatProfileUpload } from "../lib/multerSetup.js";
import updateGroupRoom from "../controllers/roomControllers/updateGroupRoom.js";
import deleteSingleRoom from "../controllers/roomControllers/deleteSingleRoom.js";
import deleteGroupRoom from "../controllers/roomControllers/deleteGroupRoom.js";

const router = express.Router();

// MARK: GET USER ROOMS
router.route("/").get(getUserRooms);

// MARK: CREATE AND DELETE SINGLE CHAT
/* prettier-ignore */
router
.route("/single")
.post(createSingleRoom)
.delete(deleteSingleRoom);

// MARK: CREATE AND DELETE GROUP CHAT
router
  .route("/group")
  .post(groupChatProfileUpload.single("image"), createGroupRoom)
  .patch(groupChatProfileUpload.single("image"), updateGroupRoom)
  .delete(deleteGroupRoom);

export default router;
