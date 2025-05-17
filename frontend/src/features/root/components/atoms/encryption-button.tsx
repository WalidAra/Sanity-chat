import { Button } from "@/components/ui/button";
import { Lock, Unlock } from "lucide-react";

type Props = {
  isRight: boolean;
  isEncrypted: boolean;
};

const EncryptionButton = ({ isRight, isEncrypted }: Props) => {
  return (
    <Button
      size={"icon"}
      className={`absolute top-0 ${
        isRight ? "-left-11 " : "-right-11 "
      }`}
    >
      {isEncrypted ? (
        <Lock className="h-4 w-4" />
      ) : (
        <Unlock className="h-4 w-4" />
      )}
    </Button>
  );
};

export default EncryptionButton;
