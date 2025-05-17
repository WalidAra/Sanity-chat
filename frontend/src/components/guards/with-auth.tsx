import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { accessToken } = useAuth();

    if (!accessToken) return <Navigate to="/auth/sign-in" />;

    return <Component {...props} />;
  };
}
