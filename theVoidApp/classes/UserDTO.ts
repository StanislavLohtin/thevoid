export interface UserDTO {
	username: string;
	email: string;
	createdAt: string;
	lastOnline: string;
	status: string;
	avaUrl?: string;
	chatIds?: string[];
}
