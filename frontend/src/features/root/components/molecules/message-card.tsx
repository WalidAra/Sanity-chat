import { useUser } from "@/store/slices/user-slice";
import { MessageType, ReactionType } from "@/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Unlock, Lock } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import fetchData from "@/lib/fetcher";
import { useAuth } from "@/hooks/use-auth";

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
  const { accessToken } = useAuth();
  const [content, setContent] = useState<string>(msg.content);
  const [isEncrypted, setIsEncrypted] = useState<boolean>(true);

  const { isPending, mutate } = useMutation({
    mutationKey: ["decrypt"],
    mutationFn: async (aesText: string) => {
      const res = await fetchData({
        endpoint: "decrypt",
        feature: "encrypt",
        method: "POST",
        accessToken: accessToken,
        payload: {
          encryptedText: aesText,
        },
      });
      return res;
    },
    onSuccess: (data) => {
      setContent(data.data as string);
      setIsEncrypted(false);
      toast.success("Decrypted the message successfully", {
        position: "bottom-right",
      });
    },
  });

  const handleToggleEncryption = async () => {
    mutate(msg.content);
  };

  const isSender = msg.sender.id === user?.id;
  if (isSender) {
    return (
      <div className="ml-auto max-w-[80%] lg:max-w-[40%] flex flex-col">
        <p className="text-muted-foreground text-sm ml-auto mr-2 font-medium">
          YOU
        </p>
        <div className="relative py-2 px-4 bg-foreground text-white rounded-lg">
          {isEncrypted && (
            <div className="absolute -left-2 -top-2 bg-amber-500 rounded-full p-1">
              <Lock className="h-3 w-3 text-white" />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <p className={`text-sm ${isEncrypted ? "font-mono" : ""}`}>
              {content}
            </p>
            {isEncrypted && (
              <div className="text-xs text-gray-300 italic">
                Your message is encrypted
              </div>
            )}
          </div>
          <div className="absolute -bottom-3 -right-3">
            <Button
              variant="secondary"
              size="icon"
              className={`h-8 w-8 rounded-full shadow-md ${
                isEncrypted
                  ? "bg-amber-500 hover:bg-amber-600 text-white"
                  : "bg-gray-700 hover:bg-gray-800 text-white"
              }`}
              onClick={handleToggleEncryption}
              disabled={isPending}
            >
              {isPending ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : isEncrypted ? (
                <Lock className="h-4 w-4" />
              ) : (
                <Unlock className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mr-auto max-w-[80%] lg:max-w-[40%] text-foreground">
      <p className="text-muted-foreground text-sm ml-2 font-medium">
        {msg.sender.name}
      </p>
      <div className="relative py-2 px-4 bg-secondary rounded-lg">
        {isEncrypted && (
          <div className="absolute -left-2 -top-2 bg-amber-500 rounded-full p-1">
            <Lock className="h-3 w-3 text-white" />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <p className={`text-sm ${isEncrypted ? "font-mono" : ""}`}>
            {content}
          </p>
          {isEncrypted && (
            <div className="text-xs text-muted-foreground italic">
              This message is encrypted
            </div>
          )}
        </div>
        <div className="absolute -bottom-3 -right-3">
          <Button
            variant="secondary"
            size="icon"
            className={`h-8 w-8 rounded-full shadow-md ${
              isEncrypted
                ? "bg-amber-500 hover:bg-amber-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
            onClick={handleToggleEncryption}
            disabled={isPending}
          >
            {isPending ? (
              <div className="h-4 w-4 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
            ) : isEncrypted ? (
              <Lock className="h-4 w-4" />
            ) : (
              <Unlock className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
