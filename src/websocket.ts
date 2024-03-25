import { IncomingMessage, Server } from "http";
import { WebSocket, WebSocketServer } from "ws";
import { verifyToken } from "./utils/jwt";
import { createPrivateMessage } from "./services/privateMessageServices";

type MessageType = "login" | "heart_beat" | "private" | "group";

interface WebSocketMessage {
  type: MessageType;
  from: string;
  to: string;
  content: string;
  creat_time: number;
}

// 存储所有连接的客户端
const clients = new Map<string, Map<number, WebSocket>>();

export const init = (server: Server) => {
  const wss = new WebSocketServer({ server });
  // 监听 WebSocket连接
  wss.on("connection", onConnection);

  wss.on("close", () => {
    clients.clear();
  });
};

let websocket: WebSocket, request: IncomingMessage;

const onConnection = (ws: WebSocket, req: IncomingMessage) => {
  websocket = ws;
  request = req;

  route("/chat", handleChat);
};

const route = (url: string, cb: () => void) => {
  if (url === request?.url) cb();
};

const handleChat = () => {
  const prefix = "chat";
  let userId: string;
  let key: number;
  websocket.onmessage = async (event) => {
    const data: WebSocketMessage = JSON.parse(event.data.toString());
    switch (data.type) {
      case "login":
        try {
          userId = verifyToken(data.content.split(" ")[1])._id;
        } catch (err) {
          console.log(err);
          break;
        }
        if (!clients.has(userId)) {
          clients.set(userId, new Map());
        }
        const clientMap = clients.get(userId);
        key = Date.now();
        clientMap.set(key, websocket);
        console.log("登录成功");
        break;

      case "heart_beat":
        const message: WebSocketMessage = {
          type: "heart_beat",
          from: "",
          to: "",
          content: "pong",
          creat_time: 0,
        };
        clients.get(userId).get(key).send(JSON.stringify(message));
        break;
      case "private":
        data.creat_time = Date.now();
        await createPrivateMessage(
          data.from,
          data.to,
          data.content,
          data.creat_time
        );
        const receiverKey = `${data.to}`;
        if (clients.has(receiverKey)) {
          const clientMap = clients.get(receiverKey);
          const wsIterator = clientMap.values();
          for (const ws of wsIterator) {
            ws.send(JSON.stringify(data));
          }
        }
        break;
      case "group":
        break;
    }
  };

  websocket.onerror = (err) => {
    console.log(err);
    clients.get(userId).delete(key);
  };

  websocket.onclose = () => {
    console.log(`${key} 关闭`);
    clients.get(userId).delete(key);
  };
};
