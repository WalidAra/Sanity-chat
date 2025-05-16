import { chatController } from "@/core/interface/controllers";
import { Router } from "express";
const router = Router();

const { getUserLastChat, getAllChats, getChatById } = chatController;

router.get("/last", getUserLastChat);
router.get("/", getAllChats);
router.get("/:id", getChatById);

export default router;
