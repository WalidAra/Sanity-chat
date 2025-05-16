import { useAuth } from "@/hooks/use-auth";
import fetchData from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation } from "react-router-dom";

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { accessToken } = useAuth();
    const { pathname } = useLocation();
    const { data, isPending, isError } = useQuery({
      enabled: !!accessToken,
      queryKey: ["last-chat"],
      queryFn: () =>
        fetchData({
          endpoint: "last",
          method: "GET",
          feature: "chat",
          accessToken,
        }),
    });

    // 1. Handle authentication first
    if (!accessToken) {
      return <Navigate to="/auth/sign-in" replace />;
    }

    // 2. Show loading state while checking last chat
    if (isPending) {
      return <div>Loading chat information...</div>;
    }

    if (!isError && data) {
      return <Navigate to={`/home/${data.data}`} replace />;
    }
    if (isError && pathname !== "/home") {
      // Consider showing an error message instead of redirecting
      return <Navigate to={`/home`} />;
    }

    // 5. Finally render the protected component
    return <Component {...props} />;
  };
}
