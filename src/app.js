const fs = require("fs");
const path = require("path");
const { v4: uuidV4 } = require("uuid");

const express = require("express");
const { createServer } = require("http");
const app = express();

app.use(express.static("public"));

app.get("/", (_, res) => {
  res.redirect(`/meet.html?id=${uuidV4()}`);
});

const server = require("http").createServer(app);
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  socket.on("join", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).emit("join", userId);

    socket.on("disconnect", () => {
      socket.to(roomId).emit("leave", userId);
    });
  });
});

server.listen(3000, () => console.log("server ready!"));

console.log("hallo?");
