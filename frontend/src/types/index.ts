import { Method } from "axios";

export type Fetch = {
  accessToken?: string | null;
  feature: "auth" | "user" | "chat";
  endpoint: string;
  method: Method;
  payload?: object;
};

export type FetchResponse<T> = {
  data: T;
  message: string;
  status: boolean;
};

export type AccessToken = {
  accessToken: string;
};
export type User = {
  id: string;
  image: string | null;
  name: string;
  email: string;
  createdAt: Date;
};

export type CreatedChat = {
  id: string;
  isGroup: boolean;
  name: string | null;
  image: string | null;
  adminId: string | null;
  createdAt: Date;
};

export type MessageType = "SIMPLE" | "COMPLEX";

export type ChatWithMembersAndLastMessage = {
  id: string;
  isGroup: boolean;
  name: string | null;
  image: string | null;
  adminId: string | null;
  createdAt: Date;
  members: {
    id: string;
    userId: string;
    chatId: string;
    user: {
      id: string;
      name: string;
      image: string | null;
    };
  }[];
  messages: {
    id: string;
    chatId: string;
    type: MessageType;
    createdAt: Date;
    updatedAt: Date;
    senderId: string;
    content: string;
  }[];
};
