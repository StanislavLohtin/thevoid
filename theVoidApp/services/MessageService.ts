import FirebaseService from "./FirebaseService";
import { Message } from "../classes/Message";
import { MessageDTO } from "../classes/MessageDTO";
import {CurrentUser} from "../classes/CurrentUser";

class _MessageService {
  messageIds: Set<string> = new Set<string>();

  public async fetchMessageById(chatId: string, id: string): Promise<Message> {
    if (this.messageIds.has(id)) {
      return;
    }
    return new Promise<Message>((resolve, reject) => {
      FirebaseService.get(`chats/${chatId}/messages/recent/${id}`).then(
        (messageDto) => {
          this.messageIds.add(id);
          resolve(
            new Message(id, messageDto.toJSON() as unknown as MessageDTO)
          );
        },
        (reason) => {
          console.warn(reason);
          reject(reason);
        }
      );
    });
  }

  public async fetchMessagesForUser(user: CurrentUser): Promise<Message[]> {
    return new Promise<Message[]>((resolve, reject) => {
      resolve([]);
      /*FirebaseService.get(`chats/${chatId}/messages/recent/${id}`).then(
        (messageDto) => {
          this.messageIds.add(id);
          resolve(
            new Message(id, messageDto.toJSON() as unknown as MessageDTO)
          );
        },
        (reason) => {
          console.warn(reason);
          reject(reason);
        }
      );*/
    });
  }
}

const MessageService = new _MessageService();
export default MessageService;
