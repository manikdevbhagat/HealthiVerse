import express from "express";
import { authenticate } from "../middleware/auth/verifyToken.js";
import { createChat, getAllChats } from "../controllers/chatController.js";

const router = express.Router();

router.get("/", authenticate, getAllChats);
router.post("/", authenticate, createChat);

export default router;
