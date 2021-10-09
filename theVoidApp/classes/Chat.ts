import {ChatDTO} from "./ChatDTO";
import {CurrentUser} from "./CurrentUser";
import {Message} from "./Message";
import UserService from "../services/UserService";

export class Chat {
  id: string;
  userId: number = -1;
  lastMessageId: string;
  user?: CurrentUser;
  lastMessage?: Message;

  constructor(chatDTO: ChatDTO) {
    this.id = chatDTO.id;
    /*if (Number(chatDTO.user1) === UserService.getCurrentUserId()) {
      this.userId = Number( chatDTO.user2);
    } else if (Number(chatDTO.user2) === UserService.getCurrentUserId()) {
      this.userId = Number( chatDTO.user1);
    }
    this.lastMessageId = chatDTO.lastMessage;
    this.lastMessage = UserService.getMessageById(this.lastMessageId);*/
  	console.log("Creating chat: ", this.id);
  }
}
