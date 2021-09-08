import {ChatDTO} from "./ChatDTO";
import {User} from "./User";
import {Message} from "./Message";
import {UserService} from "../services/UserService";

export class Chat {
  id: number;
  userId: number = -1;
  lastMessageId: string;
  user?: User;
  lastMessage?: Message;

  constructor(chatDTO: ChatDTO) {
    this.id = Number(chatDTO.id);
    if (Number(chatDTO.user1) === UserService.getCurrentUserId()) {
      this.userId = Number( chatDTO.user2);
    } else if (Number(chatDTO.user2) === UserService.getCurrentUserId()) {
      this.userId = Number( chatDTO.user1);
    }
    this.lastMessageId = chatDTO.lastMessage;
    this.lastMessage = UserService.getMessageById(this.lastMessageId);
  	console.log("Creating chat: ", this.id);
  }
}
