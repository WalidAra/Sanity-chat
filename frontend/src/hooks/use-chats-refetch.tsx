import { ChatsRefetchContext } from "@/providers/chats-refetch-provider";
import React from "react";

export const useChatsRefetch = () => {
  const context = React.useContext(ChatsRefetchContext);

  if (!context) {
    throw new Error(
      "useChatsRefetch must be used within a ChatsRefetchProvider"
    );
  }
  return context;
};
