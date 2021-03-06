import { CurrentUser } from "../classes/CurrentUser";
import { UserPrivateDTO } from "../classes/UserPrivateDTO";
import FirebaseService from "./FirebaseService";
import { UserPublic } from "../classes/UserPublic";
import { Message } from "../classes/Message";
import { UserPublicDTO } from "../classes/UserPublicDTO";
import { httpsCallable } from "firebase/functions";
import { loginWithEmail } from "../components/Firebase/firebase";

class _UserService {
  currentUser: CurrentUser;
  users: UserPublic[] = [];
  currentUserPromiseResolve: (CurrentUser) => void;
  currentUserPromiseReject: (string) => void;

  public checkMindbodyAndRegister(
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ) {
    const fnCall = httpsCallable(
      FirebaseService.functions,
      "checkMindbodyAndRegister"
    );
    return fnCall({ email, password, firstname, lastname }).then(
      (result: any) => {
        const data = result.data;
        console.log("checkMindbodyAndRegister received from server:", data);
        return loginWithEmail(email, password);
      },
      (e: Error) => {
        throw new Error(e.message);
        /*Alert.alert("Error", e.error || e.toString(), [
          {
            text: "Ok",
            onPress: () => console.log("Ok Pressed"),
            style: "cancel",
          },
        ]);*/
      }
    );
  }

  private initCurrentUser(
    uid: string,
    userPublicDTO: UserPublicDTO,
    userPrivateDTO: UserPrivateDTO
  ) {
    this.currentUser = new CurrentUser(uid, userPublicDTO, userPrivateDTO);
    this.users.push(this.currentUser);
    this.currentUserPromiseResolve(this.currentUser);
    if (this.currentUser.isAdmin) {
      this.loadAllUsers();
    }
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

  public async fetchCurrentUser(uid: string) {
    let [userPublic, userPrivate] = await Promise.all([
      FirebaseService.get("users", uid),
      FirebaseService.get("users", uid, "private", "data"),
    ]);

    this.initCurrentUser(
      uid,
      userPublic as UserPublicDTO,
      userPrivate as UserPrivateDTO
    );
  }

  public async fetchUser(uid: string): Promise<UserPublic> {
    const userById = this.getById(uid);
    if (userById !== null) {
      return Promise.resolve(userById);
    }
    let userPublic = await FirebaseService.get("users", uid);
    const newUser = new UserPublic(uid, userPublic as UserPublicDTO);
    this.users.push(newUser);
    return newUser;
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

  private async loadAllUsers(): Promise<void> {
    const allUsers = await FirebaseService.getCollection("users");
    try {
      for (const user of allUsers) {
        const userPublicDTO = user.data() as UserPublicDTO;
        const newUser = new UserPublic(user.id, userPublicDTO);
        this.addUserToListIfNotIn(newUser);
      }
    } catch (e) {}
  }
}

const UserService = new _UserService();
export default UserService;
