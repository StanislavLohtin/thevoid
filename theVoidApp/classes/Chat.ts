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
    this.type = Number(chatDTO.info.type);
    this.lastMessageId = chatDTO.info.lastMessageId;
    this.title = chatDTO.info.title;
    this.description = chatDTO.info.description;
    this.chatImage = chatDTO.info.chatImage;
    for (const userId of chatDTO.info.userIds) {
      if (userId === UserService.currentUser.id) {
        continue;
      }
      // let newUser = new UserPublic(userId, user.username, user.avaUrl, user.);
      this.otherUserIds.push(userId);
      // UserService.addUserToListIfNotIn(newUser);
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
