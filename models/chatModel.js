import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: [true, "Room must be provided"],
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isLabel: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// chatSchema.pre("save", function (next) {
//   if (!!this.file.fileType) {
//     this.isFile = true;
//   }

//   next();
// });

export const Chat = mongoose.model("Chat", chatSchema);
