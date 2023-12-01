import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import gymRoutes from "./routes/gym.js";
import trainerRoutes from "./routes/trainer.js";
import dieticianRoutes from "./routes/dietician.js";
import chatRoutes from "./routes/chat.js";
import messageRoutes from "./routes/message.js";
import "./utils/deleteExpiredMemberships.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin:true
};

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

//database connect
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB database is connected");
  } catch (err) {
    console.log(err);
    console.log("MongoDB database connection failed");
  }
};


//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/gym", gymRoutes);
app.use("/api/v1/trainer", trainerRoutes);
app.use("/api/v1/dietician", dieticianRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/message", messageRoutes);

const server = app.listen(port, () => {
  connectDB();
  console.log(`Server running on PORT ${port}`);
});

import { Server } from "socket.io";

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  // console.log("Connected to socket.io");

  socket.on("setup", (userId) => {
    socket.join(userId);
    // console.log("User setup: " + userId);
    socket.emit("connected");
  });

  socket.on("join chat", (chatId) => {
    socket.join(chatId);
    // console.log("User joined chat: " + chatId);
  });

  socket.on("new message", (newMessage) => {
    let chat = newMessage.chat;
    const senderId = newMessage.sender.senderData._id;

    if (senderId === chat.client._id) {
      socket
        .in(chat.business.businessData._id)
        .emit("message received", newMessage);
    } else {
      socket.in(chat.client._id).emit("message received", newMessage);
    }
  });

});