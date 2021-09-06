import { User } from "../classes/User";
import { UserDTO } from "../classes/UserDTO";
import { Message } from "../classes/Message";
import { MessageDTO } from "../classes/MessageDTO";
import { FirebaseService } from "./FirebaseService";

export class UserService {
  currentUserID: number = 1;
  users: User[] = [];
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

  public static getById(id: number): User {
    for (let user of this.getInstance().users) {
      if (user.id === id) {
        return user;
      }
    }
    throw new Error("User with id " + id + " not found!");
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
          const newUser = new User(user.toJSON() as unknown as UserDTO);
          this.getInstance().users.push(newUser);
        });
        console.warn("total users:", this.getInstance().users.length);
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
          console.warn("messages!!!!!:", data);
        data.forEach((message) => {
          if (!message.ref.key) {
            console.error("messages has no key!!", message);
            return;
          }
          this.getInstance().allMessages.push(
            new Message(message.toJSON() as unknown as MessageDTO, message.ref.key)
          );
        });
        console.warn("total messages:", this.getInstance().users.length);
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
  }

}

console.log("Loaded UserService!");
let serviceInstance: UserService;
