import { Method } from "axios";

export type Fetch = {
  accessToken?: string | null;
  feature: "auth" | "user" | "chats";
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

export type Chat = {
  id: string;
  isGroup: boolean;
  name: string | null;
  ownerId: string | null;
};
