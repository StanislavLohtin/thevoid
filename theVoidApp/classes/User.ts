import { UserDTO } from "./UserDTO";

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  lastOnline: Date;
  avaUrl: string;

  constructor(userDTO: UserDTO) {
  	console.warn("creating user", userDTO.id);
    this.id = Number(userDTO.id);
    this.name = userDTO.name;
    this.email = userDTO.email;
    this.password = userDTO.password;
    this.createdAt = new Date(userDTO.createdAt);
    this.lastOnline = new Date(userDTO.lastOnline);
    this.avaUrl = userDTO.avaUrl;
  }
}
