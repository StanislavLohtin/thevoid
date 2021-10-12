import { CurrentUserDTO } from "./CurrentUserDTO";
import { UserPublic } from "./UserPublic";
import { Chat } from "./Chat";

export class CurrentUser extends UserPublic {
  username: string;
  email: string;
  createdAt: Date;
  lastOnline: Date;
  status: string;
  chatIds?: string[];
  chats?: Chat[];

  constructor(uid: string, userDTO: CurrentUserDTO) {
    super(uid, userDTO.username, userDTO.avaUrl);

    this.username = userDTO.username;
    this.email = userDTO.email;
    this.status = userDTO.status;
    this.createdAt = new Date(Number(userDTO.createdAt));
    this.lastOnline = new Date(Number(userDTO.lastOnline));
    this.chatIds = Object.values(userDTO.chatIds);
    this.chats = [];

    console.log("CurrentUser ", this);
  }

  public getChatById(id: string): Chat {
    return this.chats.find((chat) => chat.id === id);
  }
}
