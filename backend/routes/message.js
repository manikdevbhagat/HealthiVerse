import express from "express";
import { authenticate } from "../middleware/auth/verifyToken.js";
import { getAllMessages, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.post("/", authenticate, sendMessage);
router.get("/:chatId", authenticate, getAllMessages);

export default router;