import { CurrentUser } from "../classes/CurrentUser";
import FirebaseService from "./FirebaseService";
import { Chat } from "../classes/Chat";
import { ChatInfoDTO } from "../classes/ChatInfoDTO";
import MessageService from "./MessageService";
import UserService from "./UserService";
import { Alert } from "react-native";
import { Message } from "../classes/Message";

class _ChatService {
  private _currentChatId: string;
  private watchingChats: string[] = [];

  get currentChatId(): string {
    return this._currentChatId;
  }

  set currentChatId(value: string) {
    this._currentChatId = value;
  }

  async getChatsForUser(
    user: CurrentUser,
    updateChatList: ([]) => void
  ): Promise<Chat[]> {
    const promises = [];

    for (const chatId of user.chatIds) {
      const newPromise = new Promise((res, rej) => {
        this.fetchChatInfo(chatId, user, res, rej);
      });
      promises.push(newPromise);
    }

    return Promise.all(promises).then(() => {
      updateChatList(_ChatService.sortByDate(user.chats));
      return _ChatService.sortByDate(user.chats);
    });
  }

  private fetchChatInfo(
    chatId: string,
    user: CurrentUser,
    res: (value: unknown) => void,
    rej: (reason?: any) => void
  ): void {
    FirebaseService.get(`chats/${chatId}`).then(
      (chatDto) => {
        let chat = new Chat(chatId, chatDto as ChatInfoDTO);
        user.chats.push(chat);
        const messagePromise = MessageService.fetchMessageById(
          chatId,
          chat.lastMessageId
        );
        messagePromise.then(
          (message) => {
            chat.lastMessage = message;
          },
          (reason) => {
            rej(reason);
          }
        );
        let firstUserPromise;
        for (const otherUserId of chat.otherUserIds) {
          const fetchUserPromise = UserService.fetchUser(otherUserId);
          if (!firstUserPromise) {
            firstUserPromise = fetchUserPromise;
          }
          fetchUserPromise.then(
            (newUser) => {
              chat.otherUsers.push(newUser);
              if (!chat.otherUser) {
                chat.otherUser = newUser;
              }
            },
            (reason) => {
              rej(reason);
            }
          );
        }
        Promise.all([messagePromise, firstUserPromise]).then(() => {
          res(true);
        });
      },
      (reason) => {
        console.warn(reason);
        rej(reason);
      }
    );
  }

  /*watchLastMessageOfAChat(
        chatId: string,
        setLastMessage: (Message) => void,
        navigation
      ) {
        if (this.watchingChats.includes(chatId)) {
          return;
        }
        this.watchingChats.push(chatId);
        const chat = UserService.currentUser.getChatById(chatId);
        FirebaseService.startOnChangeListener(
          `chats/${chatId}/info/lastMessageId`,
          (newMessageId) => {
            if (!newMessageId || chat.lastMessageId === newMessageId) {
              return;
            }
            console.log("newMessageId", newMessageId);
            MessageService.fetchMessageById(chatId, newMessageId).then(
              (message) => {
                let newMessage = UserService.updateLastMessageOfChat(
                  chatId,
                  message
                );
                setLastMessage(newMessage);
                if (this.currentChatId !== chatId) {
                  this.alertNewMessage(newMessage, chatId, navigation);
                }
              }
            );
          }
        );
      }*/

  async createChat(chatInfoDTO: ChatInfoDTO): Promise<boolean> {
    return null;
    /*const currentUserInChat = chatInfoDTO.info.userIds.get(
      UserService.currentUser.id
    );
    if (currentUserInChat) {
      chatInfoDTO.info.userIds = chatInfoDTO.info.userIds.set(
        UserService.currentUser.id,
        {
          avaUrl: currentUserInChat.avaUrl,
          username: currentUserInChat.username,
        }
      );
    }

    const usersPublicObjectInsteadOfMap = {};
    for (const [userId, user] of chatInfoDTO.usersPublic) {
      usersPublicObjectInsteadOfMap[userId] = user;
    }

    const chatInfoDTOUpload: ChatInfoDTOUpload = { ...chatInfoDTO };
    chatInfoDTOUpload.usersPublic = usersPublicObjectInsteadOfMap;

    const id = await FirebaseService.push(`chats/`, {
      info: chatInfoDTOUpload,
    });

    if (!id.key) {
      console.warn("create failed");
      return false;
    }
    if (currentUserInChat) {
      UserService.currentUser.chats.push(new Chat(id.key, chatInfoDTO));
    }

    for (const userId of chatInfoDTO.usersPublic.keys()) {
      await FirebaseService.set(`users/${userId}/chatIds/${id.key}`, id.key);
    }

    return true;*/
  }

  static sortByDate(chats: Chat[]): Chat[] {
    return chats.sort(
      (chat1, chat2) =>
        chat2.lastMessage?.createdAt.getTime() -
        chat1.lastMessage?.createdAt.getTime()
    );
  }

  private alertNewMessage(message: Message, chatId: string, navigation) {
    console.log("alertNewMessage!", message.content);
    Alert.alert(
      "new message from " + message.sender.username,
      message.content,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "reply",
          onPress: () => {
            console.log("reply Pressed");
            navigation.navigate("ChatScreen", { id: chatId });
          },
        },
      ]
    );
  }

  /*private userHasChatWithId(user: CurrentUser, chatId: string): boolean {
    return user.chats.find(chat => chat.id === chatId) !== undefined;
  }*/
}

const ChatService = new _ChatService();
export default ChatService;
