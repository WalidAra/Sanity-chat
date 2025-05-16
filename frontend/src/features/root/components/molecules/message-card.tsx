
type Props = {
  isSender: boolean;
};

const MessageCard = ({ isSender }: Props) => {
  if (isSender) {
    return (
      <div className="ml-auto  max-w-[80%] flex flex-col ">
        <p className="text-muted-foreground text-sm ml-auto mr-2 font-medium">
          YOU
        </p>
        <div className=" py-2 px-4 bg-foreground text-white rounded-lg">
          <div className="flex flex-col gap-2">
            <p className="text-sm">Hello, how are you?</p>
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
          <p className="text-sm">Hello, how are you?</p>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
