import { useUser } from "@/store/slices/user-slice";
import { MessageType, ReactionType } from "@/types";

type Props = {
  msg: {
    id: string;
    chatId: string;
    senderId: string;
    content: string;
    type: MessageType;
    createdAt: Date;
    updatedAt: Date;
  } & {
    attachments: {
      id: string;
      messageId: string;
      url: string;
    }[];
    reactions: {
      id: string;
      userId: string;
      messageId: string;
      type: ReactionType;
      createdAt: Date;
      updatedAt: Date;
    }[];
    sender: {
      id: string;
      name: string;
      image: string | null;
    };
  };
};

const MessageCard = ({ msg }: Props) => {
  const { user } = useUser();

  const isSender = msg.sender.id === user?.id;
  if (isSender) {
    return (
      <div className="ml-auto  max-w-[80%] flex flex-col ">
        <p className="text-muted-foreground text-sm ml-auto mr-2 font-medium">
          YOU
        </p>
        <div className=" py-2 px-4 bg-foreground text-white rounded-lg">
          <div className="flex flex-col gap-2">
            <p className="text-sm">
              {msg.content}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mr-auto max-w-[80%] text-foreground">
      <p className="text-muted-foreground text-sm ml-auto mr-2 font-medium">
        John Doe
      </p>
      <div className=" py-2 px-4 bg-secondary rounded-lg">
        <div className="flex flex-col gap-2">
          <p className="text-sm">
            {msg.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
