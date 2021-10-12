import FirebaseService from "./FirebaseService";
import { Message } from "../classes/Message";
import { MessageDTO } from "../classes/MessageDTO";
import { CurrentUser } from "../classes/CurrentUser";

class _MessageService {
  messages: Set<Message> = new Set<Message>();

  public async fetchMessageById(chatId: string, id: string): Promise<Message> {
    console.log("fetchMessageById " + id);
    const messageWithId = this.getMessageById(id);
    if (messageWithId) {
      return Promise.resolve(messageWithId);
    }
    return new Promise<Message>((resolve, reject) => {
      FirebaseService.get(`chats/${chatId}/messages/recent/${id}`).then(
        (messageDto) => {
          if (this.getMessageById(id) !== undefined) {
            return;
          }
          let newMessage = new Message(
            id,
            messageDto.toJSON() as unknown as MessageDTO
          );
          this.messages.add(newMessage);
          resolve(newMessage);
        },
        (reason) => {
          console.warn(reason);
          reject(reason);
        }
      );
    });
  }

  public async fetchLastMessagesForUser(user: CurrentUser): Promise<Message[]> {
    console.log("fetchLastMessagesForUser");
    const result = [];
    for (const chat of user.chats) {
      result.push(
        this.fetchMessageById(chat.id, chat.lastMessageId).then((message) => {
          chat.lastMessage = message;
        })
      );
    }
    return Promise.all(result);
  }

  private getMessageById(id: string): Message | undefined {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return undefined;
  }
}

const MessageService = new _MessageService();
export default MessageService;
