/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect } from "react";

type AuthContextType = {
  accessToken: string | null;
  signToken: (token: string) => void;
  signOut: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );

  const signToken = (token: string) => {
    setAccessToken(token);
    localStorage.setItem("accessToken", token);
  };

  const signOut = () => {
    setAccessToken(null);
    localStorage.removeItem("accessToken");
  };

  const isAuthenticated = !!accessToken;

  useEffect(() => {
    if (!accessToken) {
      const storedToken = localStorage.getItem("accessToken");

      setAccessToken(storedToken);
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{ accessToken, signToken, signOut, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
