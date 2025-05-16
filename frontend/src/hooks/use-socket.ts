import { SocketContext } from "@/providers/socket-provider";
import React from "react";

export const useSocket = () => {
  const socketContext = React.useContext(SocketContext);
  if (!socketContext) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socketContext;
};
