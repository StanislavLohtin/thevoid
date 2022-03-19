import AvaService from "../services/AvaService";
import { UserPublicDTO } from "./UserPublicDTO";
import { TypeUtil } from "../utils/TypeUtil";

export class UserPublic {
  id: string;
  username: string;
  avaUrl: string;
  lastOnline: Date;
  status: string;

  constructor(uid: string, userPublicDTO: UserPublicDTO) {
    this.id = uid;
    this.username = userPublicDTO.username;
    this.avaUrl = userPublicDTO.avaUrl;
    this.lastOnline = TypeUtil.getDate(userPublicDTO.lastOnline);
    this.status = userPublicDTO.status;
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
