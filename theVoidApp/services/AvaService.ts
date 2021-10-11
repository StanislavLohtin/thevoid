import firebase from "firebase";
import FirebaseService from "./FirebaseService";

class _AvaService {
  storageRef: firebase.storage.Reference;

  public getAvaUrl(uid: string): Promise<string> {
    this.checkIfRefInited();
    const imagesRef = this.storageRef.child("avatars");
    const avaRef = imagesRef.child(uid + ".png");
    avaRef.updateMetadata({ cacheControl: "public,max-age=4000" }).then(
      (value) => {
        console.log("updateMetadata: ", value);
      },
      (reason) => {
        console.warn(reason);
      }
    );
    return avaRef.getDownloadURL();
  }

  private checkIfRefInited() {
    if (!this.storageRef) {
      console.warn("checkIfRefInited");
      this.storageRef = firebase.storage(FirebaseService.app).ref();
    }
  }
}

const AvaService = new _AvaService();
export default AvaService;
