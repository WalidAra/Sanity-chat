/* eslint-disable react-refresh/only-export-components */
import { useAuth } from "@/hooks/use-auth";
import SocketInstance from "@/utils/socket";
import { createContext } from "react";
import { Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAuth();
  const socket = SocketInstance.getInstance(accessToken as string);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
