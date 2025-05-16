import { useParams } from "react-router-dom";
import Header from "../components/organisms/header";
import MessageForm from "../components/molecules/message-form";
import { useQuery } from "@tanstack/react-query";
import fetchData from "@/lib/fetcher";
import { useAuth } from "@/hooks/use-auth";
// import MessageCard from "../components/molecules/message-card";

const Chat = () => {
  const { accessToken } = useAuth();
  const { id } = useParams();

  const { data , isPending } = useQuery({
    queryKey: ["chat", id],
    queryFn: () =>
      fetchData({
        endpoint: `${id}`,
        feature: "chat",
        method: "GET",
        accessToken,
      }),
    refetchOnWindowFocus: false,
  });

  console.log("chat data", data);

  return (
    <div className="flex-1 flex flex-col ">
      <Header />

      <div className="flex flex-1 flex-col gap-4 py-4 px-8">
        {/* <MessageCard isSender />
        <MessageCard isSender={false} />
        <MessageCard isSender={false} />
        <MessageCard isSender />
        <MessageCard isSender={false} />
        <MessageCard isSender={false} />
        <MessageCard isSender />
        <MessageCard isSender={false} />
        <MessageCard isSender={false} />
        <MessageCard isSender />
        <MessageCard isSender={false} />
        <MessageCard isSender={false} />
        <MessageCard isSender />
        <MessageCard isSender={false} />
        <MessageCard isSender={false} />
        <MessageCard isSender />
        <MessageCard isSender={false} />
        <MessageCard isSender={false} /> */}
      </div>
      <MessageForm />
    </div>
  );
};

export default Chat;
