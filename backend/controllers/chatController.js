import Chat from "../models/ChatSchema.js";
import Gym from "../models/GymSchema.js";
import User from "../models/UserSchema.js";
import Trainer from "../models/TrainerSchema.js";
import Dietician from "../models/DieticianSchema.js";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter.js";

const senderTypeToModel = {
  User: User,
  Gym: Gym,
  Trainer: Trainer,
  Dietician: Dietician,
};

//custom populate function
async function populateChatSender(chat) {
  if (chat.latestMessage && chat.latestMessage.sender) {
    const senderType = chat.latestMessage.sender.senderType;
    const senderId = chat.latestMessage.sender.senderData;

    const senderModel = senderTypeToModel[senderType];

    if (senderModel) {
      const senderDetails = await senderModel.findById(senderId, "name photo");
      chat.latestMessage.sender.senderData = senderDetails;
    }
  }
}

export const getAllChats = async (req, res) => {
  const userId = req.userId;
  const userRole = req.role;

  //create mongodb query based on user role
  let query = {};
  if (userRole === "client") {
    query.client = userId;
  } else {
    query["business.businessData"] = userId;
  }

  try {
    const chats = await Chat.find(query)
      .populate("latestMessage")
      .populate({
        path: "business.businessData",
        select: "name photo",
      })
      .populate({
        path: "client",
        select: "name photo",
      })
      .sort({ updatedAt: -1 });

    // Populate the latestMessage.sender field based on the senderType
    for (const chat of chats) {
      populateChatSender(chat);
    }

    res.status(200).json({
      success: true,
      message: "Chats received successfully",
      chats: chats,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const createChat = async (req, res) => {
  const senderId = req.userId;
  const senderRole = req.role;
  const { receiverId, receiverType } = req.body;

  //create mongodb query based on user role
  let query = {};
  if (senderRole === "client") {
    query.client = senderId;
    (query["business.businessType"] = capitalizeFirstLetter(receiverType)),
      (query["business.businessData"] = receiverId);
  } else {
    query.client = receiverId;
    (query["business.businessType"] = capitalizeFirstLetter(senderRole)),
      (query["business.businessData"] = senderId);
  }

  try {
    const existingChat = await Chat.find(query)
      .populate("latestMessage")
      .populate({
        path: "business.businessData",
        select: "name photo",
      })
      .populate({
        path: "client",
        select: "name photo",
      })
      .sort({ updatedAt: -1 });

    if (existingChat.length > 0) {
      populateChatSender(existingChat[0]);
      return res.status(200).json({
        success: true,
        message: "Chat received successfully",
        chat: existingChat[0],
      });
    }

    const newChat = await Chat.create(query);

    const populatedChat = await Chat.findById(newChat._id)
      .populate("latestMessage")
      .populate({
        path: "business.businessData",
        select: "name photo",
      })
      .populate({
        path: "client",
        select: "name photo",
      })
      .sort({ updatedAt: -1 });

    // Populate the latestMessage.sender field based on the senderType
    populateChatSender(populatedChat);

    res.status(200).json({
      success: true,
      message: "Chat created successfully",
      chat: populatedChat,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};