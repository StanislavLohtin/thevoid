import firebase from "firebase";

class _AvaService {
  storageRef: firebase.storage.Reference;

  public getAvaUrl(uid: string): Promise<string> {
    console.warn("getAvaUrl");
    this.checkIfRefInited();
    const imagesRef = this.storageRef.child("avatars");
    const avaRef = imagesRef.child(uid + ".png");
    return avaRef.getDownloadURL();
  }

  private checkIfRefInited() {
    if (!this.storageRef) {
      console.warn("checkIfRefInited");
      this.storageRef = firebase.storage().ref()
    }
  }
}

console.log("Loaded AvaService!");
const AvaService = new _AvaService();
export default AvaService;
