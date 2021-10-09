import { UserDTO } from "./UserDTO";
import { UserPublic } from "./UserPublic";
import { Chat } from "./Chat";
import AvaService from "../services/AvaService";

export class CurrentUser extends UserPublic {
  username: string;
  email: string;
  createdAt: Date;
  lastOnline: Date;
  status: string;
  chatIds?: string[];
  chats?: Chat[];

  constructor(uid: string, userDTO: UserDTO) {
    console.log("creating user", uid, userDTO);

    super(uid, userDTO.username);

    this.username = userDTO.username;
    this.email = userDTO.email;
    this.status = userDTO.status;
    this.createdAt = new Date(userDTO.createdAt);
    this.lastOnline = new Date(userDTO.lastOnline);
    this.chatIds = userDTO.chatIds;
    this.chats = [];
  }
}
