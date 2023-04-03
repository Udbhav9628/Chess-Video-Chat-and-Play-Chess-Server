const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const https = require("https");
// const Server = require("http").createServer(app);

const Key = fs.readFileSync("private.key");
const Certificate = fs.readFileSync("certificate.crt");

const credentials = {
  Key,
  Certificate,
};

// const io = require("socket.io")(Server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

app.use(cors());
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  return res.status(200).send("App Is Running");
});

// io.on("connection", (socket) => {
//   //emit for send events
//   socket.emit("me", socket.id);

//   //on for listen events
//   socket.on("callUser", ({ userTocall, signalData, from, name }) => {
//     io.to(userTocall).emit("callUser", { userTocall, signalData, from, name });
//   });

//   socket.on("answerCall", ({ signal, to }) => {
//     io.to(to).emit("callAccepted", signal);
//   });

//   socket.on("chessMove", ({ moveObj, towhom }) => {
//     console.log(moveObj);
//     console.log(towhom);
//     io.to(towhom).emit("chessMove", moveObj);
//   });

//   socket.on("disconnect", () => {
//     socket.broadcast.emit("CallEnded");
//   });

//   console.log("new Clint Connected  -  " + socket.id);
// });

app.listen("8000", () => {
  console.log("Server Is Running on PORT 80");
});

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(8443);
