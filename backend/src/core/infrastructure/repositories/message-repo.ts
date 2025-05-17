import { prisma } from "@/config";
import { MessageType } from "generated/prisma";

export const messageRepo = {
  sendMessage: async (data: {
    chatId: string;
    senderId: string;
    content: string;
    type?: MessageType;
    attachments?: string[]; // URLs
  }) => {
    const message = await prisma.message.create({
      data: {
        chatId: data.chatId,
        senderId: data.senderId,
        content: data.content,
        type: data.type || "SIMPLE",
        attachments:
          data.type === "COMPLEX"
            ? {
                create: data.attachments?.map((url) => ({ url })) || [],
              }
            : undefined,
      },
      include: {
        attachments: true,
        reactions: true,
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return message;
  },
};
