import firebase from "firebase";

export const APP_NAME = "TheVoidApp";

class _FirebaseService {
  app: firebase.app.App;

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyD_BqfEgKj5qxkUXjo1s4MQxL67ChQS19w",
      authDomain: "thevoid-54561.firebaseapp.com",
      projectId: "thevoid-54561",
      storageBucket: "thevoid-54561.appspot.com",
      messagingSenderId: "792083192023",
      appId: "1:792083192023:web:9046e9337dc70da8f6f892",
      measurementId: "G-TC8FLKK846",
    };

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
        const data = snapshot.val();
        callback(data);
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
