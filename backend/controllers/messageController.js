import Chat from "../models/ChatSchema.js";
import Message from "../models/MessageSchema.js";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter.js";

export const sendMessage = async (req, res) => {
  const senderId = req.userId;

  const senderType = capitalizeFirstLetter(
    req.role !== "client" ? req.role : "user"
  );
  const { content, chatId } = req.body;
  let query = {};

  if (content && chatId) {
    query.content = content;
    query.chat = chatId;
    query["sender.senderType"] = senderType;
    query["sender.senderData"] = senderId;
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Invalid data passed into request" });
  }

  try {
    let newMessage = await Message.create(query);
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { latestMessage: newMessage._id },
      { new: true }
    );

    // newMessage = await newMessage.populate({
    //   path: "sender",
    //   populate: {
    //     path: "senderData",
    //     select: "name photo",
    //     model: senderType,
    //   },
    // });

    res.status(200).json({
      sucess: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllMessages = async (req, res) => {
  const chatId = req.params.chatId;

  try {
    const messages = await Message.find({ chat: chatId });

    res.status(200).json({
      success: true,
      message: "Received all messages in the chat",
      data: messages,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};