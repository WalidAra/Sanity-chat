import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UserCard = () => {
  return (
    <Card className={`shrink-0 w-full`}>
      <CardHeader className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2" >
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="">
            <CardTitle>WalidAra</CardTitle>
            <CardDescription>arawald90@gmail.com</CardDescription>
          </div>
        </div>

        <Button size={"sm"}>Message</Button>
      </CardHeader>
    </Card>
  );
};

export default UserCard;
