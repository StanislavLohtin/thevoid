import { ChatInfoDTO } from "./ChatInfoDTO";
import { Message } from "./Message";
import UserService from "../services/UserService";
import { UserPublic } from "./UserPublic";

export class Chat {
  id: string;
  type: string;
  lastMessageId: string;
  usersPublic: UserPublic[] = [];
  title?: string;
  description?: string;
  lastMessage?: Message;
  otherUser: UserPublic;
  messages: Message[] = [];

  constructor(id: string, chatDTO: ChatInfoDTO) {
    const currentUser = UserService.currentUser;
    this.id = id;
    this.type = chatDTO.type;
    this.lastMessageId = chatDTO.lastMessageId;
    this.title = chatDTO.title;
    this.description = chatDTO.description;
    for (const user of Object.values(chatDTO.usersPublic)) {
      if (user.id === UserService.currentUser.id) {
        continue;
      }
      let newUser = new UserPublic(user.id, user.username, user.avaUrl);
      this.usersPublic.push(newUser);
      UserService.addUserToListIfNotIn(newUser);
    }

    // TODO: only for 2 person chat type 0
    // if (this.type === "0") {
    this.otherUser = this.usersPublic.find(
      (user) => user.id !== currentUser.id
    );
    // }

    console.log("Creating chat: ", this.id);
  }

  public addMessageIfNotInList(newMessage: Message): void {
    if (this.messages.find((message) => message.id === newMessage.id)) {
      return;
    }
    this.messages.push(newMessage);
  }
}
