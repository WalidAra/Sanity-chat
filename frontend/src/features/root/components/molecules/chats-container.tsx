/* eslint-disable @typescript-eslint/no-explicit-any */
import { SidebarGroupContent } from "@/components/ui/sidebar";

type Props = {
  chats: any[];
};

const ChatsContainer = ({ chats }: Props) => {
  return (
    <SidebarGroupContent>
      {chats.map((mail) => (
        <a
          href="#"
          key={mail.email}
          className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <div className="flex w-full items-center gap-2">
            <span>{mail.name}</span>{" "}
            <span className="ml-auto text-xs">{mail.date}</span>
          </div>
          <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
            {mail.teaser}
          </span>
        </a>
      ))}
    </SidebarGroupContent>
  );
};

export default ChatsContainer;
