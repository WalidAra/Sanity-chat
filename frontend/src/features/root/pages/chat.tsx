import { useParams } from "react-router-dom";
import Header from "../components/organisms/header";
import MessageForm from "../components/molecules/message-form";
import MessageCard from "../components/molecules/message-card";

const Chat = () => {
  const { id } = useParams();

  return (
    <div className="flex-1 flex flex-col ">
      <Header />

      <div className="flex flex-1 flex-col gap-4 py-4 px-8">
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
        <MessageCard isSender={false} />
        <MessageCard isSender />
        <MessageCard isSender={false} />
        <MessageCard isSender={false} />
      </div>
      <MessageForm />
    </div>
  );
};

export default Chat;
