import {
  Chat as ChatType,
  Member,
  Message,
  Attachment,
  Reaction,
} from "../../../../generated/prisma";

export type User = {
  id: string;
  image: string | null;
  name: string;
  email: string;
  createdAt: Date;
};

export type Chat = ChatType & {
  members: (Member & {
    user: {
      name: string;
      id: string;
      image: string | null;
    };
  })[];
  admin: {
    id: string;
  } | null;
  messages: (Message & {
    attachments: Attachment[];
    reactions: Reaction[];
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
