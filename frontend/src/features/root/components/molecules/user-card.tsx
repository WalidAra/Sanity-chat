import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/types";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <Card className={`shrink-0 w-full`}>
      <CardHeader className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user.image || ""} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="">
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
        </div>

        <Button size={"sm"} className="">
          Message
        </Button>
      </CardHeader>
    </Card>
  );
};

export default UserCard;
