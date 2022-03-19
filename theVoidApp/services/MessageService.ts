import FirebaseService from "./FirebaseService";
import {Message, MessageStatus} from "../classes/Message";
import { MessageDTO } from "../classes/MessageDTO";
import { Chat } from "../classes/Chat";
import UserService from "./UserService";

class _MessageService {
  messages: Set<Message> = new Set<Message>();

  public fetchMessageById(chatId: string, id: string): Promise<Message> {
    if (!id) {
      return Promise.resolve(undefined);
    }
    console.log("fetchMessageById " + id);
    const messageWithId = this.getMessageById(id);
    if (messageWithId) {
      return Promise.resolve(messageWithId);
    }
    return new Promise<Message>((resolve, reject) => {
      FirebaseService.get(`chats/${chatId}/messages/${id}`).then(
        (messageDto) => {
          if (this.getMessageById(id) !== undefined) {
            return;
          }
          let newMessage = new Message(id, messageDto as MessageDTO);
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

  public fetchRecentMessagesFromChat(chat: Chat, callback: () => void): void {
    FirebaseService.startOnChangeListener(
      `chats/${chat.id}/messages/`,
      (qdsList) => {
        console.log(qdsList);
        if (!qdsList) {
          callback();
          return;
        }
        for (const qds of qdsList) {
          let newMessage = new Message(qds.id, qds.data() as MessageDTO);
          chat.addMessageIfNotInList(newMessage);
          this.addMessageIfNotInList(newMessage);
        }
        // chat.lastMessage = chat.messages[chat.messages.length - 1];
        // UserService.updateLastMessageOfChat(chat.id, chat.messages)
        callback();
      }
    );
  }

  public buildMessage(chat: Chat, text: string): Message {
    return new Message("pending", {
      createdAt: null, // Date.now().toString(),
      content: text,
      sender: UserService.currentUser.id,
      status: MessageStatus.CREATED,
      type: 0,
    });
  }

  public sendMessage(chat: Chat, message: Message) {
    return FirebaseService.add(
      `chats/${chat.id}/messages/`,
      message.messageDTO
    ).then((doc) => {
      if (!doc.id) {
        throw new Error("create failed");
      }
      message.id = doc.id;
      // _MessageService.updateLastMessageId(chat.id, message.id);
    });
  }

  /*  public async fetchLastMessagesForUser(user: CurrentUser): Promise<Message[]> {
    const result = [];
    for (const chat of user.chats) {
      result.push(
        this.fetchMessageById(chat.id, chat.lastMessageId).then((message) => {
          chat.lastMessage = message;
        })
      );
    }
    return Promise.all(result);
  }*/

  private getMessageById(id: string): Message | undefined {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return undefined;
  }

  private addMessageIfNotInList(newMessage: Message): void {
    const foundMessage = [...this.messages].find((message) => message.id === newMessage.id);
    if (foundMessage) {
      foundMessage.status = newMessage.status;
      return;
    }
    this.messages.add(newMessage);
  }

  private static updateLastMessageId(chatId: string, messageId: string): void {
    FirebaseService.set(`chats/${chatId}/info/lastMessageId`, messageId).catch(
      (reason) => {
        console.warn(reason);
        throw new Error(reason);
      }
    );
  }

  getById(id: string): Message | undefined {
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
