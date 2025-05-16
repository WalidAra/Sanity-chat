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

export type CreatedChat = {
  id: string;
  isGroup: boolean;
  name: string | null;
  image: string | null;
  adminId: string | null;
  createdAt: Date;
};


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


export const MessageTypes = {
  SIMPLE: "SIMPLE",
  COMPLEX: "COMPLEX",
} as const;

export type MessageType = (typeof MessageTypes)[keyof typeof MessageTypes];

export const ReactionTypes = {
  LOVE: "LOVE",
  LAUGH: "LAUGH",
  SAD: "SAD",
  ANGRY: "ANGRY",
} as const;

export type ReactionType = (typeof ReactionTypes)[keyof typeof ReactionTypes];

export type User = {
  id: string;
  image: string | null;
  name: string;
  email: string;
  createdAt: Date;
};

export type Chat = {
  id: string;
  isGroup: boolean;
  name: string | null;
  image: string | null;
  adminId: string | null;
  createdAt: Date;
} & {
  members: ({
    id: string;
    userId: string;
    chatId: string;
  } & {
    user: {
      name: string;
      id: string;
      image: string | null;
    };
  })[];
  admin: {
    id: string;
  } | null;
  messages: ({
    id: string;
    chatId: string;
    senderId: string;
    content: string;
    type: MessageType;
    createdAt: Date;
    updatedAt: Date;
  } & {
    attachments: {
      id: string;
      messageId: string;
      url: string;
    }[];
    reactions: {
      id: string;
      userId: string;
      messageId: string;
      type: ReactionType;
      createdAt: Date;
      updatedAt: Date;
    }[];
    sender: {
      id: string;
      name: string;
      image: string | null;
    };
  })[];
};

export type Chats = {
  id: string;
  isGroup: boolean;
  name: string | null;
  image: string | null;
  createdAt: string;
  members: {
    user: {
      id: string;
      name: string;
      image: string | null;
    };
  }[];
  messages: {
    id: string;
    content: string;
    createdAt: string;
    type: "SIMPLE" | "COMPLEX";
    sender: {
      id: string;
      name: string;
      image: string | null;
    };
  }[];
}[];
