import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../organisms/app-sidebar";
import { Outlet } from "react-router-dom";
import SocketProvider from "@/providers/socket-provider";
import { withAuth } from "@/components/guards/with-auth";
import ChatsRefetchProvider from "@/providers/chats-refetch-provider";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import fetchData from "@/lib/fetcher";

function RootLayout() {
  const { accessToken } = useAuth();

  const { refetch, data , isPending } = useQuery({
    queryKey: ["user-chats"],
    queryFn: () =>
      fetchData({
        endpoint: "",
        feature: "chats",
        method: "GET",
        accessToken: accessToken,
      }),
  });

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
          <AppSidebar chats={Array.isArray(data?.data) ? data.data : []} />
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
