import { v4 } from "uuid";
import UserService from "./UserService";
const request = require("request");

class _FlowService {
  private sessionId: string = v4();
  private socketUrl: string;
  private CLIENT_ID = "YXU0Q3phbXZMfGNoeFJaRGplYw==";
  private THREAD_ID = "THREAD_ID2";
  private webSocket: WebSocket;

  constructor() {
    console.log("initing Flow AI");
    this.getSocketUrl().then(() => {
      this.connectToSocket();
    });
  }

  private getSocketUrl(): Promise<string> {
    const options = {
      method: "GET",
      url: "https://sdk.flow.ai/socket.info",
      headers: {
        "x-flowai-threadid": this.THREAD_ID,
        "x-flowai-clientid": this.CLIENT_ID,
        "x-flowai-sessionid": this.sessionId,
      },
    };

    return new Promise((res, rej) => {
      request(options, (error, response, body: string) => {
        const bodyObj: { status: string; payload: { endpoint: string } } =
          JSON.parse(body);
        if (error || bodyObj.status !== "ok") {
          rej(error);
        }

        this.socketUrl = bodyObj.payload.endpoint;
        res(this.socketUrl);
      });
    });
  }

  init() {}

  startPingPong(): void {
    console.log("starting PingPong!");
    setInterval(() => {
      this.sendToSocket({ type: "ping" });
    }, 10 * 1000);
  }

  sendMessage(text: string) {
    const message = {
      type: "message.send",
      payload: {
        threadId: this.THREAD_ID,
        speech: text,
        originator: {
          name: UserService.currentUser.username,
          role: UserService.currentUser.isAdmin ? "moderator" : "external",
        },
      },
    };
    this.sendToSocket(message);
  }

  private connectToSocket(): void {
    this.webSocket = new WebSocket(this.socketUrl);
    this.webSocket.onopen = this.onOpen;
    this.webSocket.onmessage = this.onMessage;
    this.webSocket.onerror = this.onError;
    this.webSocket.onclose = this.onClose;
  }

  private onOpen(event: any): void {
    FlowService.startPingPong();
  }

  private onMessage(event: any): void {
    console.log("onMessage", event);

  }

  private onError(event: any): void {
    console.warn(JSON.stringify(event.data));
  }

  private onClose(event: any): void {
    console.log("CLOSING SOCKET!");
    console.log(JSON.stringify(event.data));
  }

  private sendToSocket(obj: object) {
    this.webSocket.send(JSON.stringify(obj));
  }
}

const FlowService = new _FlowService();
export default FlowService;
