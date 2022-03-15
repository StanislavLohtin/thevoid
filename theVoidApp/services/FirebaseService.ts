import firebase from 'firebase/compat';
import {firebaseConfig} from "../config";
import { Functions, getFunctions } from 'firebase/functions';
import { doc, getDoc, getFirestore, Firestore } from "firebase/firestore";

export const APP_NAME = "TheVoidApp";

class _FirebaseService {
  app: firebase.app.App;
  functions: Functions;
  db: Firestore;

  constructor() {
    this.app = firebase.initializeApp(firebaseConfig, APP_NAME);
    this.functions = getFunctions(this.app);
    console.log("functions:", this.functions);
    this.db = getFirestore(this.app);
  }

  public async get(collection: string, ...ids: string[]) {
    const docRef = doc(this.db, collection, ...ids);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
    return docSnap.data();
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

  public push(path: string, obj: object) {
    return this.app.database().ref(path).push(obj);
  }

  public set(path: string, obj: any): Promise<any> {
    return this.app.database().ref(path).set(obj);
  }
}

const FirebaseService = new _FirebaseService();
export default FirebaseService;
