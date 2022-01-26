import firebase from "firebase";
import {firebaseConfig} from "../config";

export const APP_NAME = "TheVoidApp";

class _FirebaseService {
  app: firebase.app.App;

  constructor() {
    this.app = firebase.initializeApp(firebaseConfig, APP_NAME);
  }

  public getApp(): firebase.app.App {
    return this.app;
  }

  public get(path: string): Promise<firebase.database.DataSnapshot> {
    return this.app.database().ref(path).get();
  }

  public startOnChangeListener(path: string, callback: (any) => void): void {
    this.app
      .database()
      .ref(path)
      .on("value", (snapshot) => {
        callback(snapshot.val());
      });
  }

  /*  public once(path: string): Promise<firebase.database.DataSnapshot> {
    return this.app.database().ref(path).once("value");
  }*/

  public push(path: string, obj: object): firebase.database.ThenableReference {
    return this.app.database().ref(path).push(obj);
  }

  public set(path: string, obj: any): Promise<any> {
    return this.app.database().ref(path).set(obj);
  }
}

const FirebaseService = new _FirebaseService();
export default FirebaseService;
