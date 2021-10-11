import AvaService from "../services/AvaService";

export class UserPublic {
  id: string;
  username: string;
  avaUrl: string;

  constructor(uid: string, username: string, avaUrl: string) {
    this.id = uid;
    this.username = username;
    this.avaUrl = avaUrl;
  }

  public updateAvaUrl(): Promise<string> {
    console.log(`getting avaUrl for ${this.id}`);

    return AvaService.getAvaUrl(this.id).then(
      (url) => {
        console.log(`url: ${url}`);
        this.avaUrl = url;
        return url;
      },
      (reason) => {
        console.warn(`reason: ${reason}`);
        return reason;
      }
    );
  }
}
