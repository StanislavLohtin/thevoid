import { FirebaseTime } from "./FirebaseTime";

export interface UserPublicDTO {
  avaUrl: string;
  lastOnline: FirebaseTime;
  username: string;
  status: string;
}
