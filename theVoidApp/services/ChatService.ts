import { CurrentUser } from "../classes/CurrentUser";
import FirebaseService from "./FirebaseService";
import { Chat } from "../classes/Chat";
import { ChatInfoDTO } from "../classes/ChatInfoDTO";

class _ChatService {
  public async getChatsForUser(user: CurrentUser): Promise<Chat[]> {
    const promises = [];
    for (const chatId of user.chatIds) {
      promises.push(FirebaseService.get(`chats/${chatId}/info`).then(
        (chatDto) => {
          user.chats.push(new Chat(chatId, chatDto.toJSON() as unknown as ChatInfoDTO));
        },
        (reason) => {
          console.warn(reason);
        }
      ));
    }
    return Promise.all(promises).then(() => {
      return user.chats;
    });
  }
}

const ChatService = new _ChatService();
export default ChatService;
