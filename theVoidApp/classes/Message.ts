import {MessageDTO} from "./MessageDTO";

export class Message {
	id: number;
	name: string;
	avaUrl: string;
	text: string;
	time: Date;
	incoming: boolean;
	status?: string;

	constructor(messageDTO: MessageDTO) {
		this.id = Number(messageDTO.id).valueOf();
		this.name = messageDTO.name;
		this.avaUrl = messageDTO.avaUrl;
		this.text = messageDTO.text;
		this.time = new Date(messageDTO.time);
		this.incoming = messageDTO.incoming === "true";
		this.status = messageDTO.status;
		console.log(this);
	}
}
