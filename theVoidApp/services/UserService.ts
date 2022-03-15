import { CurrentUser } from "../classes/CurrentUser";
import { CurrentUserDTO } from "../classes/CurrentUserDTO";
import FirebaseService from "./FirebaseService";
import { UserPublic } from "../classes/UserPublic";
import MessageService from "./MessageService";
import { Message } from "../classes/Message";

class _UserService {
  currentUser: CurrentUser;
  users: UserPublic[] = [];
  currentUserPromiseResolve: (CurrentUser) => void;
  currentUserPromiseReject: (string) => void;

  public createUser(uid: string, email: string, username: string) {
    const now = Date.now().toString();
    const newUser: CurrentUserDTO = {
      email: email,
      username: username,
      createdAt: now,
      lastOnline: now,
      status: "Hello, I am using the Void!",
      chatIds: [],
    };

    FirebaseService.set("/users/" + uid, newUser).then(
      () => {
        this.initCurrentUser(uid, newUser, false);
      },
      (reason) => {
        console.warn("currentUserPromiseReject");
        this.currentUserPromiseReject(reason);
      }
    );
  }

  private initCurrentUser(
    uid: string,
    newUser: CurrentUserDTO,
    isAdmin: boolean
  ) {
    this.currentUser = new CurrentUser(uid, newUser, isAdmin);
    this.users.push(this.currentUser);
    if (isAdmin) {
      this.loadAllUsers().then(() => {
        this.currentUserPromiseResolve(this.currentUser);
      });
    } else {
      this.currentUserPromiseResolve(this.currentUser);
    }
    /*this.currentUser.updateAvaUrl().then(
      (value) => {
        console.log(`updateAvaUrl:${value}`);
        this.currentUserPromiseResolve(this.currentUser);
      },
      (reason) => {
        console.warn(`reject: ${reason}`);
        this.currentUserPromiseReject(reason);
      }
    );*/
  }

  public getCurrentUser(): Promise<CurrentUser> {
    return new Promise<CurrentUser>((resolve, reject) => {
      if (this.currentUser) {
        resolve(this.currentUser);
        return;
      }
      this.currentUserPromiseResolve = resolve;
      this.currentUserPromiseReject = reject;
    });
  }

  public async getUser(uid: string) {
    const user = await FirebaseService.get("users", uid);
    // const isAdmin = await FirebaseService.get("/permissions/" + uid);
    this.initCurrentUser(
      uid,
      user as CurrentUserDTO,
      true
    );
  }

  public getById(id: string): UserPublic {
    for (let user of this.users) {
      if (user.id === id) {
        return user;
      }
    }
    console.warn("User with id " + id + " not found!");
    return null;
  }

  public addUserToListIfNotIn(newUser: UserPublic): void {
    if (this.users.find((user) => user.id === newUser.id)) {
      return;
    }
    this.users.push(newUser);
  }

  public resetAll(): void {
    console.log("resetting this.currentUser");
    this.users = [];
    this.currentUser = null;
  }

  public updateLastMessageOfChat(chatId: string, message: Message): Message {
    const chat = this.currentUser.getChatById(chatId);
    if (!chat) {
      return;
    }
    chat.lastMessageId = message.id;
    chat.lastMessage = message;
    console.log("updating last msg: ", chat.lastMessage);
    return chat.lastMessage;
  }

  private loadAllUsers(): Promise<boolean> {
    return new Promise<boolean>(async (res, rej) => {
      const allUsers = await FirebaseService.get("/users/");
      try {
        for (const [userId, userData] of Object.entries(allUsers.val())) {
          const userPublic = userData as UserPublic;
          const newUser = new UserPublic(
            userId,
            userPublic.username,
            userPublic.avaUrl
          );
          this.addUserToListIfNotIn(newUser);
        }
        res(true);
      } catch (e) {
        rej(false);
      }
    });
  }
}

const UserService = new _UserService();
export default UserService;
