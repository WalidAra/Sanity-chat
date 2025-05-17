import { checkAuthSocket, SocketWithAuth } from "@/middlewares";
import { Server, Socket } from "socket.io";
import { redisClient } from "./helpers";
import { MessageType } from "generated/prisma";
import { messageRepo } from "./core/infrastructure/repositories/message-repo";

const socketInitializer = (httpServer: import("node:http").Server) => {
  const io = new Server(httpServer, {
    cors: {
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });
  io.use(checkAuthSocket);
  io.on("connection", async (socket: Socket) => {
    const userId = (socket as SocketWithAuth).userId;
    if (!userId) return;

    await redisClient.hSet("online-users", userId, socket.id);
    socket.on(
      "first-message",
      async (
        data: {
          chatId: string;
          senderId: string;
          content: string;
          type?: MessageType;
          attachments?: string[];
        },
        receiverId: string
      ) => {
        socket.join(data.chatId);
        const newMessage = await messageRepo.sendMessage(data);
        const receiverSocketId = await redisClient.hGet(
          "online-users",
          receiverId
        );

        if (!receiverSocketId) return;

        io.to(receiverSocketId).socketsJoin(data.chatId);
        io.to(receiverSocketId).emit("refresh-list", { refreshList: true });
        io.to(data.chatId).emit("new-message", newMessage);
      }
    );

    socket.on(
      "message",
      async (
        data: {
          chatId: string;
          senderId: string;
          content: string;
          type?: MessageType;
          attachments?: string[]; // URLs
        },
        receiverId: string
      ) => {
        socket.join(data.chatId);
        const newMessage = await messageRepo.sendMessage(data);
        io.to(data.chatId).emit("new-message", newMessage);
      }
    );

    socket.on("disconnect", async () => {
      await redisClient.hDel("online-users", userId);
    });
  });
};

export default socketInitializer;
