const request = require("request");

class _FlowService {
  private sessionId: string = this.uuidv4();
  private socketUrl: string;
  private CLIENT_ID = "YXAtQUZqdS1YfGNDRnN1X0dpag==";
  private webSocket: WebSocket;

  constructor() {
    console.log("initing Flow AI");
    this.getSocketUrl().then(() => {
      this.connectToSocket();
      this.startPingPong();
    });
  }

  private getSocketUrl(): Promise<string> {
    const options = {
      method: "GET",
      url: "https://sdk.flow.ai/socket.info",
      headers: {
        "x-flowai-threadid": "THREAD_ID",
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
    setInterval(() => {
      this.webSocket.send(JSON.stringify({ type: "ping" }));
    }, 10 * 1000);
  }

  private connectToSocket(): void {
    this.webSocket = new WebSocket(this.socketUrl);
    this.webSocket.onopen = this.onOpen;
    this.webSocket.onmessage = this.onMessage;
    this.webSocket.onerror = this.onError;
    this.webSocket.onclose = this.onClose;
  }

  private onOpen(event: any): void {
    console.log("connected");
  }

  private onMessage(event: any): void {
    console.log("onMessage", event);
  }

  private onError(event: any): void {
    console.log(JSON.stringify(event.data));
  }

  private onClose(event: any): void {
    console.log(JSON.stringify(event.data));
  }

  private uuidv4() {
    // @ts-ignore
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (Math.random()[0] & (15 >> (c / 4)))
        // (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
}

const FlowService = new _FlowService();
export default FlowService;
