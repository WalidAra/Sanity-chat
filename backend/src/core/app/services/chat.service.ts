import { redisClient } from "@/helpers";
import { ConstraintError } from "../base";
import { chatRepo } from "@/core/infrastructure/repositories";

export const chatService = {
  getAllChats: async ({ userId }: { userId: string }) => {
    const chats = await chatRepo.getUserChats({ userId });
    return chats;
  },
  getChatById: async ({
    chatId,
    userId,
  }: {
    chatId: string;
    userId: string;
  }) => {
    if (!chatId) {
      throw new ConstraintError("Chat not found", 404);
    }
    const chat = await chatRepo.getChatById({ chatId });

    if (!chat) {
      throw new ConstraintError("Chat not found", 404);
    }

    await redisClient.hSet("last-chat", userId, chatId);

    return chat;
  },

  createChat: async (
    chatData: {
      name?: string;
      image?: string;
      isGroup?: boolean;
      adminId?: string;
      members: string[];
    },
    userId: string
  ) => {
    chatData.members.push(userId);
    const newChat = await chatRepo.createChat(chatData);
    await redisClient.hSet("last-chat", userId, newChat.id);
    return newChat;
  },

  getLastChat: async ({ userId }: { userId: string }) => {
    const lastChatId = await redisClient.hGet("last-chat", userId);

    if (!lastChatId) {
      throw new ConstraintError("No last chat found", 404);
    }

    return lastChatId;
  },
};
