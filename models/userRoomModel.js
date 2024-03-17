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
    isBlocked: {
      type: Boolean,
      default: false,
    },
    seenBlockedMessage: {
      type: Boolean,
      default: false,
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
