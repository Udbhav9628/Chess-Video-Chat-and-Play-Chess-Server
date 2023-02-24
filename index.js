const http = require("http");
const WebSocketServer = require("websocket").server;
let WebSocket_Connection = null;

const http_Server = http.createServer((req, res) => {
  console.log("Server Created");
});

const websocket = new WebSocketServer({
  httpServer: http_Server,
});

websocket.on("request", (request) => {
  WebSocket_Connection = request.accept(null, request.origin);

  WebSocket_Connection.on("onopen", (e) => {
    console.log("opened!!", e);
  });

  WebSocket_Connection.on("message", (Message) => {
    console.log("Message Recieved", Message);
  });

  WebSocket_Connection.on("close", () => {
    console.log("Connection Closed");
  });
});

http_Server.listen(8080, () => {
  console.log("Server is Listening to Port 8080");
});
