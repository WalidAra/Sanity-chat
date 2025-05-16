import { Entity } from "../app/base";
import { Chat as ChatDTO } from "../app/dto/api.dto";

export class Chat implements Entity {
  chat: ChatDTO;

  constructor(chat: ChatDTO) {
    this.chat = chat;
  }

  getData: () => ChatDTO = () => {
    return this.chat;
  };
}
