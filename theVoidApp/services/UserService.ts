import { User } from "../classes/User";
import firebase from "firebase";
import { UserDTO } from "../classes/UserDTO";

export class UserService {
  currentUserID: number = 1;
  users: User[] = [];

  constructor(currentUserID: number) {
    this.currentUserID = currentUserID;
  }

  private static getInstance() {
    return serviceInstance;
  }

  public static init(currentUserID: number) {
    serviceInstance = new UserService(currentUserID);
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

  public static fetchUsers() {
    firebase
      .database()
      .ref("/users")
      .get()
      .then(
        (data) => {
          data.forEach((user) => {
            this.getInstance().users.push(new User(user.toJSON() as unknown as UserDTO));
          });
          console.warn("total users:", this.getInstance().users.length);
        },
        (e) => {
          console.error("users failed!!");
          console.error(e);
        }
      );
  }
}
console.warn("init UserService!");
let serviceInstance: UserService;
