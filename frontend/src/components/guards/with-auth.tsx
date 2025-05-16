import { useAuth } from "@/hooks/use-auth";
import fetchData from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation } from "react-router-dom";

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { accessToken } = useAuth();
    const { pathname } = useLocation();

    const shouldFetch = !!accessToken && !pathname.includes("/home/chat");

    const { data, isPending } = useQuery({
      enabled: shouldFetch,
      queryKey: ["last-opened-chat"],
      queryFn: () =>
        fetchData<{ id: string }>({
          endpoint: "last",
          method: "GET",
          feature: "chat",
          accessToken,
        }),
      retry: false,
    });

    if (!accessToken) return <Navigate to="/auth/sign-in" replace />;

    if (shouldFetch && isPending)
      return <div className="loading">Loading...</div>;

    if (data) {
      const {
        data: { id },
      } = data;
      return <Navigate to={`/home/chat/${id}`} replace />;
    }

    return <Component {...props} />;
  };
}
