import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../organisms/app-sidebar";
import { Outlet } from "react-router-dom";
import SocketProvider from "@/providers/socket-provider";
import { withAuth } from "@/components/guards/with-auth";
import ChatsRefetchProvider from "@/providers/chats-refetch-provider";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import fetchData from "@/lib/fetcher";
import { ChatWithMembersAndLastMessage } from "@/types";
import { useEffect } from "react";
import { useSocket } from "@/hooks/use-socket";

function RootLayout() {
  const { accessToken } = useAuth();
  const socket = useSocket();
  const { refetch, data, isPending } = useQuery({
    queryKey: ["user-chats"],
    queryFn: () =>
      fetchData<ChatWithMembersAndLastMessage[]>({
        endpoint: "",
        feature: "chat",
        method: "GET",
        accessToken: accessToken,
      }),
  });

  useEffect(() => {
    if (socket) {
      socket.on("refresh-list", (data: { refreshList: boolean }) => {
        if (data.refreshList) {
          refetch();
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("refresh-list");
      }
    };
  }, [socket, refetch]);

  if (isPending) {
    return;
  }

  return (
    <SocketProvider>
      <ChatsRefetchProvider refetch={refetch}>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "350px",
            } as React.CSSProperties
          }
        >
          <AppSidebar chats={data?.data || []} />
          <SidebarInset>
            <Outlet />
          </SidebarInset>
        </SidebarProvider>
      </ChatsRefetchProvider>
    </SocketProvider>
  );
}

const AuthenticatedRootLayout = withAuth(RootLayout);
export default AuthenticatedRootLayout;
// export default RootLayout;
