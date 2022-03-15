import { FirebaseTime } from "./FirebaseTime";

export interface UserPrivateDTO {
  email: string;
  createdAt: FirebaseTime;
  chats?: string[];
  mindbodyId: string;
  permissions: number;
}
