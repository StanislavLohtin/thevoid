import { MessageDTO } from "./MessageDTO";
import { User } from "./User";
import { UserService } from "../services/UserService";

export class Message {
  id: string;
  content: string;
  createdAt: Date;
  sender: User;
  receiver: User;
  status: string;

  constructor(messageDTO: MessageDTO, id: string) {
    this.id = id;
    this.content = messageDTO.content;
    this.createdAt = new Date(messageDTO.createdAt);
    this.sender = UserService.getById(Number(messageDTO.sender));
    this.receiver = UserService.getById(Number(messageDTO.receiver));
    this.status = messageDTO.status;
  	console.log(`Creating message ${this.id}: "${this.content}"`);
  }

  sentByCurrentUser():boolean {
    return this.sender.id === UserService.getCurrentUserId();
  }

  receivedByCurrentUser():boolean {
    return this.receiver.id === UserService.getCurrentUserId();
  }

  sentByUser(id: number):boolean {
    return this.sender.id === id;
  }

  receivedByUser(id: number):boolean {
    return this.sender.id === id;
  }
}
