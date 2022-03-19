import {FirebaseTime} from "./FirebaseTime";

export interface ChatInfoDTO {
  type: number;
  lastMessageId?: string;
  description?: string;
  createdBy: string;
  createdAt: FirebaseTime;
  title?: string;
  chatImage?: string;
  userIds: string[];
}
