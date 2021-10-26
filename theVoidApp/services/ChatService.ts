import { CurrentUser } from "../classes/CurrentUser";
import FirebaseService from "./FirebaseService";
import { Chat } from "../classes/Chat";
import { ChatInfoDTO } from "../classes/ChatInfoDTO";
import MessageService from "./MessageService";
import UserService from "./UserService";
import { Alert } from "react-native";
import { Message } from "../classes/Message";
import { ChatInfoDTOUpload } from "../classes/ChatInfoDTOUpload";

class _ChatService {
  private _currentChatId: string;

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

  watchLastMessageOfAChat(
    chatId: string,
    setLastMessage: (Message) => void,
    navigation
  ) {
    FirebaseService.startOnChangeListener(
      `chats/${chatId}/info/lastMessageId`,
      (newMessageId) => {
        if (
          MessageService.getById(newMessageId) !== undefined ||
          !newMessageId
        ) {
          return;
        }
        console.log("newMessageId", newMessageId);
        MessageService.fetchMessageById(chatId, newMessageId).then(() => {
          let newMessage = UserService.updateLastMessageOfChat(
            chatId,
            newMessageId
          );
          setLastMessage(newMessage);
          if (this.currentChatId !== chatId) {
            this.alertNewMessage(newMessage, chatId, navigation);
          }
        });
      }
    );
  }

  async createChat(chatInfo: ChatInfoDTO): Promise<boolean> {
    const currentUserInChat = chatInfo.usersPublic.get(
      UserService.currentUser.id
    );
    if (currentUserInChat) {
      chatInfo.usersPublic = chatInfo.usersPublic.set(
        UserService.currentUser.id,
        {
          avaUrl: currentUserInChat.avaUrl,
          username: currentUserInChat.username,
        }
      );
    }

    const usersPublicObjectInsteadOfMap = {};
    for (const [userId, user] of chatInfo.usersPublic) {
      usersPublicObjectInsteadOfMap[userId] = user;
    }

    const chatInfoDTOUpload: ChatInfoDTOUpload = { ...chatInfo };
    chatInfoDTOUpload.usersPublic = usersPublicObjectInsteadOfMap;

    const id = await FirebaseService.push(`chats/`, {
      info: chatInfoDTOUpload,
    });

    if (!id.key) {
      console.warn("create failed");
      return false;
    }
    if (currentUserInChat) {
      UserService.currentUser.chats.push(new Chat(id.key, chatInfo));
    }

    for (const userId of chatInfo.usersPublic.keys()) {
      await FirebaseService.set(`users/${userId}/chatIds/${id.key}`, id.key);
    }

    return true;
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
