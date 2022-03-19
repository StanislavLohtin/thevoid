import firebase from "firebase/compat";
import { firebaseConfig } from "../config";
import { Functions, getFunctions } from "firebase/functions";
import {
  doc,
  query,
  collection,
  getDoc,
  addDoc,
  orderBy,
  getFirestore,
  Firestore,
  onSnapshot,
  DocumentReference,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import Unsubscribe = firebase.Unsubscribe;

export const APP_NAME = "TheVoidApp";

class _FirebaseService {
  app: firebase.app.App;
  functions: Functions;
  firestoreDb: Firestore;
  private unsubFn: Unsubscribe;

  constructor() {
    this.app = firebase.initializeApp(firebaseConfig, APP_NAME);
    this.functions = getFunctions(this.app);
    console.log("functions:", this.functions);
    this.firestoreDb = getFirestore(this.app);
  }

  public async get(collection: string, ...ids: string[]) {
    const docRef = doc(this.firestoreDb, collection, ...ids);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
    return docSnap.data();
  }

  public startOnChangeListener(
    path: string,
    callback: (qds: QueryDocumentSnapshot[]) => void
  ): void {
    console.log("starting listener");
    const q = query(collection(this.firestoreDb, path), orderBy("createdAt"));

    this.unsubFn = onSnapshot(q, (doc) => {
      console.log("ChangeListener data: ", doc);
      callback(doc.docs);
    });
  }

  public stopOnChangeListener(): void {
    console.log("stopping listener");
    this.unsubFn();
  }

  /*  public once(path: string): Promise<firebase.database.DataSnapshot> {
    return this.app.database().ref(path).once("value");
  }*/

  public async add(path: string, obj: object): Promise<DocumentReference> {
    const docRef = await addDoc(collection(this.firestoreDb, path), obj);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  }

  public set(path: string, obj: any): Promise<any> {
    return this.app.database().ref(path).set(obj);
  }
}

const FirebaseService = new _FirebaseService();
export default FirebaseService;
