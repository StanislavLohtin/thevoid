import {FirebaseTime} from "./FirebaseTime";

export interface ChatInfoDTO {
  info: {
    type: number;
    lastMessageId?: string;
    description?: string;
    createdBy: string;
    createdAt: FirebaseTime;
    title?: string;
    chatImage?: string;
    userIds: string[];
  };
}
