import { MessageDTO } from "./MessageDTO";
import UserService from "../services/UserService";
import { UserPublic } from "./UserPublic";
import { darkerPurple } from "../constants/Colors";

export enum MessageType {
  TEXT,
  IMAGE,
  VIDEO,
  AUDIO,
}

export enum MessageStatus {
  CREATED,
  SENT,
  DELIVERED,
  READ,
  DELETED,
}

export class Message {
  id: string;
  content: string;
  type: number;
  createdAt: Date;
  sender: UserPublic;
  status: number;
  messageDTO: MessageDTO;
  createdAtShort: string;

  constructor(id: string, messageDTO: MessageDTO) {
    this.id = id;
    this.messageDTO = messageDTO;
    this.content = messageDTO.content;
    this.type = Number(messageDTO.type);
    this.createdAt = new Date(Number(messageDTO.createdAt));
    this.sender = UserService.getById(messageDTO.sender);
    this.status = Number(messageDTO.status);
    this.createdAtShort =
      this.createdAt.getHours().toString().padStart(2, "0") +
      ":" +
      this.createdAt.getMinutes().toString().padStart(2, "0");

    // console.log(`Creating message ${this.id}: "${this.content}"`);
  }

  sentByCurrentUser(): boolean {
    return this.sender.id === UserService.currentUser.id;
  }

  sentByUser(id: string): boolean {
    return this.sender.id === id;
  }

  receivedByUser(id: string): boolean {
    return this.sender.id === id;
  }

  getIconName() {
    switch (this.status) {
      case MessageStatus.SENT:
        return "check";
      case MessageStatus.DELIVERED:
      case MessageStatus.READ:
        return "check-all";
      default:
        return "alert-circle-outline";
    }
  }

  getIconColor(): string {
    switch (this.status) {
      case MessageStatus.SENT:
        return "grey";
      case MessageStatus.DELIVERED:
        return "grey";
      case MessageStatus.READ:
        return darkerPurple;
      default:
        return "red";
    }
  }
}
