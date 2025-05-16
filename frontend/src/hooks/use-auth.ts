import { AuthContext } from "@/providers/auth-provider";
import React from "react";

export const useAuth = () => {
  const authContext = React.useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};
