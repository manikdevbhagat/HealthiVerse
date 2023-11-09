//chatName
//users
//latest message

import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    business: {
      businessType: {
        type: String,
        enum: ['Gym', 'Trainer', 'Dieitician'],
        required: true,
      },
      businessData: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'business.businessType',
        required: true,
      },
    },
    client: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    latestMessage: {
      type: mongoose.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;