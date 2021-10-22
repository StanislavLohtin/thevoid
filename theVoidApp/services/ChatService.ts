import { CurrentUser } from "../classes/CurrentUser";
import FirebaseService from "./FirebaseService";
import { Chat } from "../classes/Chat";
import { ChatInfoDTO } from "../classes/ChatInfoDTO";
import MessageService from "./MessageService";
import UserService from "./UserService";

class _ChatService {
  updateChatList: ([]) => void;

  get currentChatId(): string {
    return this._currentChatId;
  }

  set currentChatId(value: string) {
    console.log("currentChatId:" + value);
    this._currentChatId = value;
  }

  private _currentChatId: string;

  async getChatsForUser(
    user: CurrentUser,
    updateChatList: ([]) => void
  ): Promise<Chat[]> {
    this.updateChatList = updateChatList;
    const promises = [];

    for (const chatId of user.chatIds) {
      /*if (this.userHasChatWithId(user, chatId)) {
        continue;
      }*/
      const newPromise = new Promise((res, rej) => {
        FirebaseService.get(`chats/${chatId}/info`).then(
          (chatDto) => {
            let chat = new Chat(chatId, chatDto.val() as ChatInfoDTO);
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
      updateChatList(_ChatService.sortByDate(user.chats));
      return _ChatService.sortByDate(user.chats);
    });
  }

  watchLastMessageOfAChat(chatId: string, setLastMessage: (Message) => void) {
    FirebaseService.startOnChangeListener(
      `chats/${chatId}/info/lastMessageId`,
      (newMessageId) => {
        console.log("newMessageId", newMessageId);
        setLastMessage(
          UserService.updateLastMessageOfChat(chatId, newMessageId)
        );
      }
    );
  }

  public static sortByDate(chats: Chat[]): Chat[] {
    return chats.sort(
      (chat1, chat2) =>
        chat2.lastMessage.createdAt.getTime() -
        chat1.lastMessage.createdAt.getTime()
    );
  }

  /*private userHasChatWithId(user: CurrentUser, chatId: string): boolean {
    return user.chats.find(chat => chat.id === chatId) !== undefined;
  }*/
}

const ChatService = new _ChatService();
export default ChatService;
