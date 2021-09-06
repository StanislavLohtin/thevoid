import firebase from "firebase";

export class FirebaseService {
  app: firebase.app.App;

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyD_BqfEgKj5qxkUXjo1s4MQxL67ChQS19w",
      authDomain: "thevoid-54561.firebaseapp.com",
      projectId: "thevoid-54561",
      storageBucket: "thevoid-54561.appspot.com",
      messagingSenderId: "792083192023",
      appId: "1:792083192023:web:9046e9337dc70da8f6f892",
      measurementId: "G-TC8FLKK846"
    };

    this.app = firebase.initializeApp(firebaseConfig, "TheVoidApp");
  }

  private static getInstance() {
    return serviceInstance;
  }

  public static init() {
    console.log("init FirebaseService!");
    serviceInstance = new FirebaseService();
  }

  public static getApp(): firebase.app.App {
    return serviceInstance.app;
  }

  public static get(path: string): Promise<firebase.database.DataSnapshot> {
    return serviceInstance.app.database().ref(path).get();
  }

  public static push(path: string, obj: object): firebase.database.ThenableReference {
    return serviceInstance.app.database().ref(path).push(obj);
  }
}
console.log("Loaded FirebaseService!");
let serviceInstance: FirebaseService;
