import {FirebaseTime} from "./FirebaseTime";

export interface MessageDTO {
	content: string;
	sender: string;
	createdAt: FirebaseTime;
	type: number;
	status: number;
	options?: string;
	media?: string;
}
