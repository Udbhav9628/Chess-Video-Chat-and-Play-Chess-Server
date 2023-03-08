const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const Server = require("http").createServer(app);

const io = require("socket.io")(Server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.status(200).send("App Is Running");
});

io.on("connection", (socket) => {
  //emit for send events
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("CallEnded");
  });

  //on for listen events
  socket.on("callUser", ({ userTocall, signalData, from, name }) => {
    io.to(userTocall).emit("callUser", { userTocall, signalData, from, name });
  });

  socket.on("answerCall", ({ signal, to }) => {
    io.to(to).emit("callAccepted", signal);
  });

  console.log("new Clint Connected  -  " + socket.id);
});

Server.listen("8000", () => {
  console.log("Server Is Running on PORT 8000");
});
