import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      senderType: {
        type: String,
        enum: ['User', 'Gym', 'Trainer', 'Dietician'],
        required: true,
      },
      senderData: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'sender.senderType',
        required: true,
      },
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: mongoose.Types.ObjectId,
      ref: "Chat",
    }
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;