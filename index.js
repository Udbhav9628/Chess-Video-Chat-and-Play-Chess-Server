const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const Server = require("http").createServer(app);

const file = fs.readFileSync("./B354820E767F0F0757EACB392ABAAF93.txt");

const io = require("socket.io")(Server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(bodyParser.json());

app.get(
  "/.well-known/pki-validation/B354820E767F0F0757EACB392ABAAF93.txt",
  (req, res) => {
    return res.sendFile(
      "/home/ec2-user/server/Chess-Video-Chat-and-Play-Chess-Server/B354820E767F0F0757EACB392ABAAF93.txt"
    );
  }
);

app.get("/", (req, res) => {
  return res.status(200).send("App Is Running");
});

io.on("connection", (socket) => {
  //emit for send events
  socket.emit("me", socket.id);

  //on for listen events
  socket.on("callUser", ({ userTocall, signalData, from, name }) => {
    io.to(userTocall).emit("callUser", { userTocall, signalData, from, name });
  });

  socket.on("answerCall", ({ signal, to }) => {
    io.to(to).emit("callAccepted", signal);
  });

  socket.on("chessMove", ({ moveObj, towhom }) => {
    console.log(moveObj);
    console.log(towhom);
    io.to(towhom).emit("chessMove", moveObj);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("CallEnded");
  });

  console.log("new Clint Connected  -  " + socket.id);
});

Server.listen("80", () => {
  console.log("Server Is Running on PORT 80");
});
