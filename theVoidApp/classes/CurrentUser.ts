import { UserPrivateDTO } from "./UserPrivateDTO";
import { UserPublic } from "./UserPublic";
import { Chat } from "./Chat";
import { FirebaseTime } from "./FirebaseTime";
import { TypeUtil } from "../utils/TypeUtil";
import { UserPublicDTO } from "./UserPublicDTO";

export enum Permissions {
  USER,
  MODERATOR,
  ADMIN,
  SUPER_ADMIN,
}

export class CurrentUser extends UserPublic {
  email: string;
  createdAt: Date;
  chatIds?: string[];
  chats?: Chat[];
  isAdmin: boolean;
  permissions: Permissions;

  constructor(
    uid: string,
    userPublicDTO: UserPublicDTO,
    userPrivateDTO: UserPrivateDTO
  ) {
    super(uid, userPublicDTO);

    this.email = userPrivateDTO.email;
    this.createdAt = TypeUtil.getDate(userPrivateDTO.createdAt);
    this.chatIds = userPrivateDTO.chats;
    this.chats = [];
    this.permissions = userPrivateDTO.permissions;
    this.isAdmin = this.permissions >= Permissions.ADMIN;

    console.log("CurrentUser ", this);
  }

  public getChatById(id: string): Chat {
    return this.chats.find((chat) => chat.id === id);
  }
}
