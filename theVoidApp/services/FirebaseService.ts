import firebase from "firebase/compat";
import { firebaseConfig } from "../config";
import { Functions, getFunctions } from "firebase/functions";
import {
  doc,
  query,
  collection,
  getDoc,
  getDocs,
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

  public async get(collectionName: string, ...ids: string[]) {
    const docRef = doc(this.firestoreDb, collectionName, ...ids);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.warn("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
    return docSnap.data();
  }

  public async getCollection(collectionName: string): Promise<QueryDocumentSnapshot[]> {
    const q = query(collection(this.firestoreDb, collectionName));
    const querySnapshot = await getDocs(q);
    console.log(`got ${querySnapshot.size} docs of ${collectionName}`);
    let result = [];
    querySnapshot.forEach((doc) => {
      result.push(doc)
    });

    return result;
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
