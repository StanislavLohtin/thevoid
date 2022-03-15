import { FirebaseTime } from "./FirebaseTime";

export interface UserPublicDTO {
  public: {
    avaUrl: string;
    lastOnline: FirebaseTime;
    username: string;
    status: string;
  };
}
