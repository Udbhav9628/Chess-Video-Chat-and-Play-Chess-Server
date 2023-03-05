const express = require("express");
const bodyParser = require("body-parser");
const server = require("ws").Server;

const wss = new server({ port: 8080 });
const app = express();

app.use(bodyParser.json());

//WebSocket Server
wss.on("connection", function connection(ws) {
  ws.on("message", function message(data) {
    console.log("received: %s", data);
    // wss.clients.forEach(function e(Clint) {
    //   Clint.send(data);
    // });
  });

  ws.on("close", () => {
    console.log("One Clint Disconnected");
  });

  ws.on("error", console.error);

  console.log("New Clint Connected");
});

// Http Server
app.listen("8000", () => {
  console.log("Server Is Running on PORT 8000");
});

console.log("WebSocket is Running on Port 8080");
