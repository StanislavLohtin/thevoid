import {UserPublicDTO} from "./UserPublicDTO";

export interface ChatInfoDTO {
	type: string;
	lastMessageId?: string;
	description?: string;
	title?: string;
	chatImage?: string;
	usersPublic: UserPublicDTO[];
}
