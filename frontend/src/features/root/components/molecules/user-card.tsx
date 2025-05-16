import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useChatsRefetch } from "@/hooks";
import { useAuth } from "@/hooks/use-auth";
import fetchData from "@/lib/fetcher";
import { CreatedChat, User } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  const { refetch } = useChatsRefetch();
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      fetchData<CreatedChat>({
        endpoint: "",
        feature: "chat",
        method: "POST",
        accessToken,
        payload: {
          name: null,
          image: null,
          isGroup: false,
          adminId: null,
          members: [user.id],
        },
      }),
    mutationKey: ["new-chat-with-this-nigga"],
    onSuccess: (data) => {
      refetch();
      navigate(`/home/chat/${data.data.id}`);
      toast.success("Chat created successfully");
    },
    onError: (err: unknown) => {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      }
    },
  });

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

        <Button onClick={() => mutate()} size={"sm"}>
          {isPending ? (
            <span className="loading loading-spinner loading-sm">
              <Loader />
            </span>
          ) : (
            "Message"
          )}
        </Button>
      </CardHeader>
    </Card>
  );
};

export default UserCard;
