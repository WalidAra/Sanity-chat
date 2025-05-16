import { SidebarGroupContent } from "@/components/ui/sidebar";
import { ChatWithMembersAndLastMessage } from "@/types";
import ChatCard from "./chat-card";

type Props = {
  chats: ChatWithMembersAndLastMessage[];
};

const ChatsContainer = ({ chats }: Props) => {
  return (
    <SidebarGroupContent>
      {chats.map((chat) => (
        <ChatCard chat={chat} key={chat.id} />
      ))}
    </SidebarGroupContent>
  );
};

export default ChatsContainer;
