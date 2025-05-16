import React from "react";

type ChatsRefetchContextType = {
  refetch: () => void;
};

export const ChatsRefetchContext = React.createContext<ChatsRefetchContextType>({
  refetch: () => {},
});

type Props = {
  children: React.ReactNode;
  refetch: () => void;
};

const ChatsRefetchProvider = ({ children, refetch }: Props) => {
  return (
    <ChatsRefetchContext.Provider value={{ refetch }}>
      {children}
    </ChatsRefetchContext.Provider>
  );
};

export default ChatsRefetchProvider;
