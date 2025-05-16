import React from "react";
import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";

export function withoutAuth<P extends object>(
  Component: React.ComponentType<P>
) {
  return function UnAuthenticatedComponent(props: P) {
    const { accessToken } = useAuth();

    if (accessToken) {
      return <Navigate to="/home" replace />;
    }

    return <Component {...props} />;
  };
}
