import { v4 } from "uuid";
import UserService from "./UserService";
import { Chat } from "../classes/Chat";
import MessageService from "./MessageService";

enum FlowMessageType {
  send = "message.send",
  delivered = "message.delivered",
  received = "message.received",
  pong = "pong",
}

type FlowIncomingMessage = {
  type: FlowMessageType;
  payload: {
    threadId: string;
    originator: {
      name: string;
      role: string;
    };
    messages: {
      responses: {
        type: string;
        payload: {
          text: string;
          title: string;
          subtitle: string;
          quickReplies: {
            label: string;
            type: string;
            value: string;
          }[];
          media: {
            type: string,
            url: string
          }
        };
      }[];
    }[];
  };
};

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
    }, 40 * 1000);
  }

  sendMessage(chat: Chat, text: string) {
    const message = {
      type: FlowMessageType.send,
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
    webSocket.onmessage = (e) => {
      this.onMessage(e, chatId);
    };
    webSocket.onerror = this.onError;
    webSocket.onclose = (e) => {
      this.onClose(e, chatId);
    };
    this.openedThreads.set(chatId, webSocket);
  }

  private onOpen(event: any, chatId: string): void {
    this.startPingPong(chatId);
  }

  private async onMessage(event: any, chatId: string): Promise<void> {
    const body: FlowIncomingMessage = JSON.parse(event.data);
    switch (body.type) {
      case FlowMessageType.pong:
        console.log("pong");
        return;
      case FlowMessageType.delivered:
        return;
      default:
        console.log("onMessage: ", body);
    }
    const chat = UserService.currentUser.getChatById(chatId);
    for (const flowMessage of body.payload.messages) {
      for (const response of flowMessage.responses) {
        let content = response.payload.text || "";
        if (!content) {
          content = `${response.payload.title || ""}
          ${response.payload.subtitle || ""}`;
        }
        const message = MessageService.buildMessage(chat, content);
        if (response.payload.quickReplies) {
          message.messageDTO.options = response.payload.quickReplies.map(r => r.label).join(" | ");
        }
        if (response.payload.media) {
          message.messageDTO.media = response.payload.media.url;
        }
        //TODO: otherUser always bot? flow only with 1 user?
        message.messageDTO.sender = chat.otherUser.id;
        await MessageService.sendMessage(chat, message);
      }
    }
  }

  private onError(event: any): void {
    console.warn(JSON.stringify(event.data));
  }

  private onClose(event: any, chatId: string): void {
    console.log("CLOSING SOCKET!");
    console.log(JSON.stringify(event.data));
    this.openedThreads.delete(chatId);
  }

  private sendToSocket(obj: object, chatId: string) {
    this.openedThreads.get(chatId)?.send(JSON.stringify(obj));
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
