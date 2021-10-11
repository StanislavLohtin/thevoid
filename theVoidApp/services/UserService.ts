import { CurrentUser } from "../classes/CurrentUser";
import { CurrentUserDTO } from "../classes/CurrentUserDTO";
import FirebaseService from "./FirebaseService";
import { UserPublic } from "../classes/UserPublic";

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
        this.initCurrentUser(uid, newUser);
      },
      (reason) => {
        console.warn("currentUserPromiseReject");
        this.currentUserPromiseReject(reason);
      }
    );
  }

  private initCurrentUser(uid: string, newUser: CurrentUserDTO) {
    this.currentUser = new CurrentUser(uid, newUser);
    this.currentUserPromiseResolve(this.currentUser);
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
    const user = await FirebaseService.get("/users/" + uid);
    this.initCurrentUser(uid, user.toJSON() as CurrentUserDTO);
  }

  public getById(id: string): UserPublic {
    for (let user of this.users) {
      if (user.id === id) {
        return user;
      }
    }
    throw new Error("CurrentUser with id " + id + " not found!");
  }

  public addUserToListIfNotIn(newUser: UserPublic): void {
    if (this.users.find((user) => user.id === newUser.id)) {
      return;
    }
    this.users.push(newUser);
  }

  /*  currentUserID: number = 1;
  users: CurrentUser[] = [];
  allMessages: Message[] = [];

  constructor(currentUserID: number) {
    this.currentUserID = currentUserID;
  }

  private static getInstance() {
    return serviceInstance;
  }

  public static init(currentUserID: number) {
    console.log("init UserService!");
    serviceInstance = new UserService(currentUserID);
    UserService.fetchUsers();
    UserService.fetchMessages();
  }

  public static getById(id: number): CurrentUser {
    for (let user of this.getInstance().users) {
      if (user.id === id) {
        return user;
      }
    }
    throw new Error("CurrentUser with id " + id + " not found!");
  }

  public static getMessageById(id: string): Message {
    for (let message of this.getInstance().allMessages) {
      if (message.id === id) {
        return message;
      }
    }
    throw new Error("Message with id " + id + " not found!");
  }

  public static getUsers() {
    return this.getInstance().users;
  }

  public static getCurrentUserId() {
    return this.getInstance().currentUserID;
  }

  public static getAllMessages() {
    return this.getInstance().allMessages;
  }

  private static fetchUsers() {
    FirebaseService.get("/users").then(
      (data) => {
        data.forEach((user: any) => {
          const newUser = new CurrentUser(user.toJSON() as unknown as CurrentUserDTO);
          this.getInstance().users.push(newUser);
        });
        console.log("total users:", this.getInstance().users.length);
      },
      (e) => {
        console.error("users failed!!");
        console.error(e);
      }
    );
  }

  private static getAllMessagesForUserId(id: number): Message[] {
    let result: Message[] = [];
    for (let message of UserService.getAllMessages()) {
      if (message.sender.id === id || message.receiver.id === id) {
        result.push(message);
      }
    }
    return result;
  }

  private static fetchMessages() {
    FirebaseService.get("/messages").then(
      (data) => {
          console.log("messages!!!!!:", data);
        data.forEach((message) => {
          if (!message.ref.key) {
            console.error("messages has no key!!", message);
            return;
          }
          this.getInstance().allMessages.push(
            new Message(message.toJSON() as unknown as MessageDTO, message.ref.key)
          );
        });
        console.log("total messages:", this.getInstance().users.length);
        UserService.assignMessagesToUsers();
      },
      (e) => {
        console.error("users failed!!", e);
      }
    );
  }

  private static assignMessagesToUsers() {
    for (let user of UserService.getUsers()) {
      user.messages = UserService.getAllMessagesForUserId(user.id);
    }
  }*/
}

const UserService = new _UserService();
export default UserService;
