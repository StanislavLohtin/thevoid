import { MessageDTO } from "./MessageDTO";
import UserService from "../services/UserService";
import {UserPublic} from "./UserPublic";

export enum MessageType {
  CREATED,
  SENT,
  DELIVERED,
  READ,
  DELETED
}

export class Message {
  id: string;
  content: string;
  type: string;
  createdAt: Date;
  sender: UserPublic;
  status: string;
  messageDTO: MessageDTO;

  constructor(id: string, messageDTO: MessageDTO) {
    this.id = id;
    this.messageDTO = messageDTO;
    this.content = messageDTO.content;
    this.type = MessageType[Number(messageDTO.type)];
    this.createdAt = new Date(Number(messageDTO.createdAt));
    this.sender = UserService.getById(messageDTO.sender);
    this.status = messageDTO.status;
  	console.log(`Creating message ${this.id}: "${this.content}"`);
  }

  sentByCurrentUser():boolean {
    return this.sender.id === UserService.currentUser.id;
  }

  sentByUser(id: string):boolean {
    return this.sender.id === id;
  }

  receivedByUser(id: string):boolean {
    return this.sender.id === id;
  }
}
