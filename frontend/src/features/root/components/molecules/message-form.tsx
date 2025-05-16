import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MessageForm = () => {
  return (
    <div className="sticky bottom-0 flex shrink-0 items-center gap-4 border-t bg-background py-4 px-8">
      <div className="w-full flex items-center">
        <Input className="flex-1" placeholder="Type your message" />
        <Button className="ml-2">Send</Button>
      </div>
    </div>
  );
};

export default MessageForm;
