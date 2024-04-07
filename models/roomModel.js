import { Schema, model } from "mongoose";

const roomSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    admin: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
    ],
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    onlyAdminCanMsg: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Room = model("Room", roomSchema);
