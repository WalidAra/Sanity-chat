import { checkAuthSocket, SocketWithAuth } from "@/middlewares";
import { Server, Socket } from "socket.io";
import { redisClient } from "./helpers";

const socketInitializer = (httpServer: import("node:http").Server) => {
  const io = new Server(httpServer, {
    cors: {
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });
  io.use(checkAuthSocket);
  io.on("connection", async (socket: Socket) => {
    const userId = (socket as SocketWithAuth).userId;
    if (userId) {
      await redisClient.hSet("online-users", userId, socket.id);

      

      socket.on("disconnect", async () => {
        await redisClient.hDel("online-users", userId);
      });
    }
  });
};

export default socketInitializer;
