import { SidebarGroupContent } from "@/components/ui/sidebar";
import { ChatWithMembersAndLastMessage } from "@/types";
import ChatCard from "./chat-card";
import { useEffect } from "react";
import { useSocket } from "@/hooks/use-socket";
import { useChatsRefetch } from "@/hooks";

type Props = {
  chats: ChatWithMembersAndLastMessage[];
};

const ChatsContainer = ({ chats }: Props) => {
  const socket = useSocket();
  const { refetch } = useChatsRefetch();
  useEffect(() => {
    if (socket) {
      socket.on("refresh-list", (data: { refreshList: boolean }) => {
        if (data.refreshList) {
          refetch();
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("refresh-list");
      }
    };
  }, [socket, refetch]);
  return (
    <SidebarGroupContent>
      {chats.map((chat) => (
        <ChatCard chat={chat} key={chat.id} />
      ))}
    </SidebarGroupContent>
  );
};

export default ChatsContainer;
