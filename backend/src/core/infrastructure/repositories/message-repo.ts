import { prisma } from "@/config";
import { AES } from "@/helpers/aes";
import { MessageType } from "generated/prisma";
const aes = new AES();

export const messageRepo = {
  sendMessage: async (data: {
    chatId: string;
    senderId: string;
    content: string;
    type?: MessageType;
    attachments?: string[]; // URLs
  }) => {
    const encrypted = aes.encrypt(data.content);
    const message = await prisma.message.create({
      data: {
        chatId: data.chatId,
        senderId: data.senderId,
        content: encrypted,
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
