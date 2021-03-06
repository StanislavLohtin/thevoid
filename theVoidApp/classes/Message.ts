import { MessageDTO } from "./MessageDTO";
import UserService from "../services/UserService";
import { UserPublic } from "./UserPublic";
import { darkerPurple } from "../constants/Colors";
import {TypeUtil} from "../utils/TypeUtil";

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
  senderId: string;
  sender: UserPublic;
  status: number;
  options?: string[] = [];
  media?: string;
  messageDTO: MessageDTO;
  createdAtShort: string;

  constructor(id: string, messageDTO: MessageDTO) {
    this.id = id;
    this.messageDTO = messageDTO;
    this.content = messageDTO.content;
    this.type = Number(messageDTO.type);
    this.createdAt = TypeUtil.getDate(messageDTO.createdAt);
    this.senderId = messageDTO.sender;
    this.sender = UserService.getById(this.senderId);
    this.status = Number(messageDTO.status);
    if (messageDTO.options) {
      this.options = messageDTO.options.split(" | ");
    }
    this.media = messageDTO.media;
    this.createdAtShort =
      this.createdAt.getHours().toString().padStart(2, "0") +
      ":" +
      this.createdAt.getMinutes().toString().padStart(2, "0");

    // console.log(`Creating message ${this.id}: "${this.content}"`);
  }

  sentByCurrentUser(): boolean {
    if (!this.sender) {
      this.sender = UserService.getById(this.senderId);
    }
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
