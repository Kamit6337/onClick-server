import express from "express";
import getUserRooms from "../controllers/userRoomsController/getUserRooms.js";

const router = express.Router();

router.route("/").get(getUserRooms);

export default router;
