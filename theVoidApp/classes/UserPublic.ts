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

  public getAvaUrl(): Promise<string> {
    let resolveUrl;
    let rejectUrl;
    console.log(`getting avaUrl for ${this.id}`);

    AvaService.getAvaUrl(this.id).then(
      (url) => {
        console.log(`url: ${url}`);
        this.avaUrl = url;
        resolveUrl(url);
      },
      (reason) => {
        console.warn(reason);
        rejectUrl(reason);
      }
    );

    return new Promise<string>((resolve, reject) => {
      resolveUrl = resolve;
      rejectUrl = reject;
    });
  }
}
