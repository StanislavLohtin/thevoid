import { MessageDTO } from "./MessageDTO";
import UserService from "../services/UserService";
import {UserPublic} from "./UserPublic";

export class Message {
  id: string;
  content: string;
  type: string;
  createdAt: Date;
  sender: UserPublic;
  status: string;

  constructor(id: string, messageDTO: MessageDTO) {
    this.id = id;
    this.content = messageDTO.content;
    this.type = messageDTO.type;
    this.createdAt = new Date(messageDTO.createdAt);
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
