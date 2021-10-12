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

  public resetAll(): void {
    console.log("resetting this.currentUser");
    this.users = [];
    this.currentUser = null;
  }
}

const UserService = new _UserService();
export default UserService;
