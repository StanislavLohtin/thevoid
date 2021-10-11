import { ChatInfoDTO } from "./ChatInfoDTO";
import { Message } from "./Message";
import UserService from "../services/UserService";
import { UserPublic } from "./UserPublic";
import MessageService from "../services/MessageService";

export class Chat {
  id: string;
  type: string;
  lastMessageId: string;
  usersPublic: UserPublic[] = [];
  title?: string;
  description?: string;
  lastMessage?: Message;
  otherUser: UserPublic;

  constructor(id: string, chatDTO: ChatInfoDTO) {
    const currentUser = UserService.currentUser;
    this.id = id;
    this.type = chatDTO.type;
    this.lastMessageId = chatDTO.lastMessageId;
    this.title = chatDTO.title;
    this.description = chatDTO.description;
    for (const user of Object.values(chatDTO.usersPublic)) {
      let newUser = new UserPublic(user.id, user.username, user.avaUrl);
      this.usersPublic.push(newUser);
      UserService.addUserToListIfNotIn(newUser);
      MessageService.fetchMessageById(id, this.lastMessageId).then(
        (message) => {
          console.log("this.lastMessage", message);
          this.lastMessage = message;
        },
        (reason) => {
          console.warn(reason);
        }
      );
    }

    // if (this.type === "0") {
    this.otherUser = this.usersPublic.find(
      (user) => user.id !== currentUser.id
    );
    // }

    console.log("Creating chat: ", this.id);
  }
}
