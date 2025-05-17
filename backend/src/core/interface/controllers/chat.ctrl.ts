import { TryCatchBlock } from "@/core/app/base/block";
import { chatService } from "@/core/app/services";
import { RequestWithAuth } from "@/middlewares";
import { Request, Response } from "express";

export const chatController = {
  getUserLastChat: TryCatchBlock(async (req: Request, res: Response) => {
    const { id } = (req as RequestWithAuth).auth;
    const chatId = await chatService.getLastChat({ userId: id });
    res.status(200).json({
      message: "Get last chat successfully",
      data: { id: chatId },
    });
  }),

  getChatById: TryCatchBlock(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { id: userId } = (req as RequestWithAuth).auth;

    const chat = await chatService.getChatById({ chatId: id, userId });
    res.status(200).json({
      message: "Get chat successfully",
      data: chat,
    });
  }),

  getAllChats: TryCatchBlock(async (req: Request, res: Response) => {
    const { id } = (req as RequestWithAuth).auth;
    const chats = await chatService.getAllChats({ userId: id });
    res.status(200).json({
      message: "Get all chats successfully",
      data: chats,
    });
  }),

  createNewChat: TryCatchBlock(async (req: Request, res: Response) => {
    const { id } = (req as RequestWithAuth).auth;
    console.log("req.body", req.body);
    const chat = await chatService.createChat(req.body, id);

    res.status(201).json({
      message: "Create new chat successfully",
      data: chat,
    });
  }),
};
