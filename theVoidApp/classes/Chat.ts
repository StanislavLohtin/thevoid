import { ChatInfoDTO } from "./ChatInfoDTO";
import { Message } from "./Message";
import UserService from "../services/UserService";
import { UserPublic } from "./UserPublic";

export enum ChatType {
  PRIVATE,
  COURSE,
  GROUP,
}

export class Chat {
  id: string;
  type: number;
  lastMessageId: string;
  otherUserIds: string[] = [];
  otherUsers: UserPublic[] = [];
  messages: Message[] = [];
  title?: string;
  description?: string;
  lastMessage?: Message;
  otherUser?: UserPublic;
  chatImage?: string;

  constructor(id: string, chatDTO: ChatInfoDTO) {
    this.id = id;
    this.type = Number(chatDTO.type);
    this.lastMessageId = chatDTO.lastMessageId;
    this.title = chatDTO.title;
    this.description = chatDTO.description;
    this.chatImage = chatDTO.chatImage;
    for (const userId of chatDTO.userIds) {
      if (userId === UserService.currentUser.id) {
        continue;
      }
      // let newUser = new UserPublic(userId, user.username, user.avaUrl, user.);
      this.otherUserIds.push(userId);
      // UserService.addUserToListIfNotIn(newUser);
    }

    console.log("Creating chat: ", this.id);
  }

  public addMessageIfNotInList(newMessage: Message): void {
    const foundMessage = this.messages.find((message) => message.id === newMessage.id);
    if (foundMessage) {
      foundMessage.status = newMessage.status;
      return;
    }
    this.messages.push(newMessage);
  }
}
