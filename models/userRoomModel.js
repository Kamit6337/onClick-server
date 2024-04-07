import { Schema, model } from "mongoose";

const userRoomSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    showBlockMsg: {
      type: Boolean,
      default: true,
    },
    showGroupLeaveMsg: {
      type: Boolean,
      default: true,
    },
    unread: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const UserRoom = model("UserRoom", userRoomSchema);
