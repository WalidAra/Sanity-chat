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
    const response = await fetch(
      "https://sanity-encrypt.onrender.com/encrypt",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plaintext: data.content }),
      }
    );

    if (!response.ok) {
      throw new Error("Encryption failed");
    }

    const encryptedMessage = await response.json();

    const message = await prisma.message.create({
      data: {
        chatId: data.chatId,
        senderId: data.senderId,
        content: encryptedMessage,
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
