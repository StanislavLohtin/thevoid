import { CurrentUser } from "../classes/CurrentUser";
import FirebaseService from "./FirebaseService";
import { Chat } from "../classes/Chat";
import { ChatInfoDTO } from "../classes/ChatInfoDTO";
import MessageService from "./MessageService";

class _ChatService {
  public async getChatsForUser(user: CurrentUser): Promise<Chat[]> {
    const promises = [];

    for (const chatId of user.chatIds) {
      /*if (this.userHasChatWithId(user, chatId)) {
        continue;
      }*/
      const newPromise = new Promise((res, rej) => {
        FirebaseService.get(`chats/${chatId}/info`).then(
          (chatDto) => {
            let chat = new Chat(
              chatId,
              chatDto.val() as ChatInfoDTO
            );
            user.chats.push(chat);
            MessageService.fetchMessageById(chatId, chat.lastMessageId).then(
              (message) => {
                chat.lastMessage = message;
                res();
              },
              (reason) => {
                rej(reason);
              }
            );
          },
          (reason) => {
            console.warn(reason);
            rej(reason);
          }
        );
      });
      promises.push(newPromise);
    }

    return Promise.all(promises).then(() => {
      return user.chats;
    });
  }

  /*private userHasChatWithId(user: CurrentUser, chatId: string): boolean {
    return user.chats.find(chat => chat.id === chatId) !== undefined;
  }*/
}

const ChatService = new _ChatService();
export default ChatService;
