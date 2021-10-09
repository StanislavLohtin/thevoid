import AvaService from "../services/AvaService";

export class UserPublic {
  id: string;
  username: string;
  avaUrl: string;

  constructor(uid: string, username: string) {
    this.id = uid;
    this.username = username;

    AvaService.getAvaUrl(uid).then((url) => {
      this.avaUrl = url;
    });
  }
}
