/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from "react-router-dom";
import Header from "../components/organisms/header";
import MessageForm from "../components/molecules/message-form";
import { useQuery } from "@tanstack/react-query";
import fetchData from "@/lib/fetcher";
import { useAuth } from "@/hooks/use-auth";
import { Chat as ChatProps } from "@/types";
import MessageCard from "../components/molecules/message-card";
import { useEffect } from "react";
import { useSocket } from "@/hooks/use-socket";

const Chat = () => {
  const { id } = useParams();
  const { accessToken } = useAuth();
  const socket = useSocket();
  const { data, isPending, refetch } = useQuery({
    queryKey: ["chat", id],
    queryFn: () =>
      fetchData<ChatProps>({
        endpoint: `${id}`,
        feature: "chat",
        method: "GET",
        accessToken,
      }),
  });

  useEffect(() => {
    if (socket) {
      const chatInfo: {
        chatId: string;
        senderId: string;
        content: string;
      } = {
        chatId: id as string,
      };
      socket.on("first-message", {});
    }
  }, [socket]);

  return (
    <div className="flex-1 flex flex-col ">
      <Header
        image={
          (data?.data.isGroup
            ? data.data.image
            : data?.data.members[0].user.image) as string
        }
        name={
          (data?.data.isGroup
            ? data.data.name
            : data?.data.members[0].user.name) as string
        }
      />

      <div className="flex flex-1 flex-col gap-4 py-4 px-8">
        {data?.data.messages.map((msg) => (
          <MessageCard isSender={false} />
        ))}
      </div>
      <MessageForm />
    </div>
  );
};

export default Chat;
