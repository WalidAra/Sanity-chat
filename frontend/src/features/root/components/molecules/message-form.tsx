import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSocket } from "@/hooks/use-socket";

type Props = {
  chatId: string;
  receiverId: string;
  refreshChat: () => void;
};

const MessageForm = ({ chatId, receiverId, refreshChat }: Props) => {
  const [message, setMessage] = useState("");
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("new-message", () => {
        refreshChat();
      });
    }
  }, [socket, refreshChat]);
  const handleSend = () => {
    if (socket) {
      socket.emit("message", { chatId, content: message.trim() }, receiverId);
    }
    setMessage("");
  };

  return (
    <div className="sticky bottom-0 flex shrink-0 items-center gap-4 border-t bg-background py-4 px-8">
      <div className="w-full flex items-center">
        <Input
          className="flex-1"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          className="ml-2"
          onClick={handleSend}
          disabled={!message.trim()}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default MessageForm;
