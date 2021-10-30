import { v4 } from "uuid";
import UserService from "./UserService";
import { Chat } from "../classes/Chat";

class _FlowService {
  private sessionId: string = v4();
  private CLIENT_ID = "YXU0Q3phbXZMfGNoeFJaRGplYw==";
  private openedThreads: Map<string, WebSocket> = new Map<string, WebSocket>();

  constructor() {
    console.log("initing Flow AI");
  }

  private getSocketUrl(chaId): Promise<string> {
    const options = {
      method: "GET",
      headers: {
        "x-flowai-threadid": chaId,
        "x-flowai-clientid": this.CLIENT_ID,
        "x-flowai-sessionid": this.sessionId,
      },
    };

    return new Promise(async (res, rej) => {
      const response = await fetch("https://sdk.flow.ai/socket.info", options);
      if (!response.ok) {
        rej(response.status);
      }
      type responseType = { status: string; payload: { endpoint: string } };
      const bodyObj: responseType = await response.json();
      res(bodyObj.payload.endpoint);
    });
  }

  startPingPong(chatId: string): void {
    console.log("starting PingPong!");
    setInterval(() => {
      this.sendToSocket({ type: "ping" }, chatId);
    }, 10 * 1000);
  }

  sendMessage(chat: Chat, text: string) {
    const message = {
      type: "message.send",
      payload: {
        threadId: chat.id,
        speech: text,
        originator: {
          name: UserService.currentUser.username,
          role: UserService.currentUser.isAdmin ? "moderator" : "external",
        },
      },
    };
    this.sendToSocket(message, chat.id);
  }

  private connectToSocket(chatId: string, url: string): void {
    const webSocket = new WebSocket(url);
    webSocket.onopen = (e) => {
      this.onOpen(e, chatId);
    };
    webSocket.onmessage = this.onMessage;
    webSocket.onerror = this.onError;
    webSocket.onclose = (e) => {
      this.onClose(e, chatId);
    };
    this.openedThreads.set(chatId, webSocket);
  }

  private onOpen(event: any, chatId: string): void {
    this.startPingPong(chatId);
  }

  private onMessage(event: any): void {
    console.log("onMessage", event);
  }

  private onError(event: any): void {
    console.warn(JSON.stringify(event.data));
  }

  private onClose(event: any, chatId:string): void {
    console.log("CLOSING SOCKET!");
    console.log(JSON.stringify(event.data));
    this.openedThreads.delete(chatId);
  }

  private sendToSocket(obj: object, chatId: string) {
    this.openedThreads.get(chatId).send(JSON.stringify(obj));
  }

  openSocketForChat(chat: Chat) {
    if (this.openedThreads.has(chat.id)) {
      return;
    }
    this.getSocketUrl(chat.id).then((url) => {
      this.connectToSocket(chat.id, url);
    });
  }
}

const FlowService = new _FlowService();
export default FlowService;
