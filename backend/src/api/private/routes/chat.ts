import { chatController } from "@/core/interface/controllers";
import { Router } from "express";
const router = Router();

const { getUserLastChat, getAllChats, getChatById, createNewChat } =
  chatController;

router.get("/last", getUserLastChat);
router.get("/", getAllChats);
router.get("/:id", getChatById);
router.post("/", createNewChat);

export default router;
