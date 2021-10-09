import {ChatDTO} from "./ChatDTO";

export interface UserDTO {
	username: string;
	email: string;
	createdAt: string;
	lastOnline: string;
	status: string;
	chatIds?: string[];
}
