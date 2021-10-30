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
  usersPublic: UserPublic[] = [];
  messages: Message[] = [];
  title?: string;
  description?: string;
  lastMessage?: Message;
  otherUser?: UserPublic;
  chatImage?: string;

  constructor(id: string, chatDTO: ChatInfoDTO) {
    const currentUser = UserService.currentUser;
    this.id = id;
    this.type = Number(chatDTO.type);
    this.lastMessageId = chatDTO.lastMessageId;
    this.title = chatDTO.title;
    this.description = chatDTO.description;
    this.chatImage = chatDTO.chatImage;
    for (const [userId, user] of Object.entries(chatDTO.usersPublic)) {
      if (userId === UserService.currentUser.id) {
        continue;
      }
      let newUser = new UserPublic(userId, user.username, user.avaUrl);
      this.usersPublic.push(newUser);
      UserService.addUserToListIfNotIn(newUser);
    }

    this.otherUser = this.usersPublic.find(
      (user) => user.id !== currentUser.id
    );

    console.log("Creating chat: ", this.id);
  }

  public addMessageIfNotInList(newMessage: Message): void {
    if (this.messages.find((message) => message.id === newMessage.id)) {
      return;
    }
    this.messages.push(newMessage);
  }
}
