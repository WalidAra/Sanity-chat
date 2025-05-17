import { useAuth } from "@/hooks/use-auth";
import fetchData from "@/lib/fetcher";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { accessToken } = useAuth();
    const navigate = useNavigate();

    const [data, setData] = useState<{ id: string } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
      if (!accessToken) return;

      setIsLoading(true);
      setIsError(false);

      fetchData<{ id: string }>({
        endpoint: "last",
        method: "GET",
        feature: "chat",
        accessToken,
      })
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsError(true);
          setIsLoading(false);
        });
    }, [accessToken]);

    useEffect(() => {
      if (data?.id) {
        navigate(`/home/chat/${data.id}`, { replace: true });
      } else if (isError) {
        navigate("/home", { replace: true });
      }
    }, [data, isError, navigate]);

    if (!accessToken) {
      return <Navigate to="/auth/sign-in" replace />;
    }

    if (isLoading) {
      return null; // or a spinner/loading component
    }

    return <Component {...props} />;
  };
}
