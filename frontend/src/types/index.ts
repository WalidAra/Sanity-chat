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