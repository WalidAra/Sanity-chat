import { ChatWithMembersAndLastMessage } from "@/types";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  chat: ChatWithMembersAndLastMessage;
};

function formatToTimeOnly(isoDate: string): string {
  const date = new Date(isoDate);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

const ChatCard = ({ chat }: Props) => {
  const chatName = chat.isGroup ? chat.name : chat.members[0].user.name;
  return (
    <Link
      to={`/home/chat/${chat.id}`}
      key={chat.id}
      className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    >
      <div className="flex w-full items-center gap-2">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              {chatName
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <span>{chatName}</span>
        </div>
        <span className="ml-auto text-xs">
          {formatToTimeOnly(chat.createdAt.toLocaleString())}
        </span>
      </div>
      <span className="line-clamp-2 w-[260px] text-muted-foreground whitespace-break-spaces text-xs">
        {chat.messages.length > 0
          ? chat.messages[0]?.content
          : "No messages yet"}
      </span>
    </Link>
  );
};

export default ChatCard;
