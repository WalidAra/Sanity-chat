import { prisma } from "@/config";
import { Chat } from "@/core/domain";

export const chatRepo = {
  getUserChats: async ({ userId }: { userId: string }) => {
    const chats = await prisma.chat.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        members: {
          where: {
            NOT: {
              userId,
            },
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        messages: {
          take: 1,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return chats;
  },

  getChatById: async ({
    chatId,
    userId,
  }: {
    chatId: string;
    userId: string;
  }) => {
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        members: {
          where: {
            NOT: {
              userId: userId,
            },
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        admin: {
          select: {
            id: true,
          },
        },
        messages: {
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
        },
      },
    });

    return chat ? new Chat(chat) : null;
  },

  createChat: async (data: {
    name?: string;
    image?: string;
    isGroup?: boolean;
    adminId?: string;
    members: string[];
  }) => {
    const chat = await prisma.chat.create({
      data: {
        name: data.name,
        image: data.image,
        isGroup: data.isGroup ?? false,
        adminId: data.isGroup ? data.adminId : null,
        members: {
          create: data.members.map((userId) => ({
            user: { connect: { id: userId } },
          })),
        },
      },
    });

    return chat;
  },
};
