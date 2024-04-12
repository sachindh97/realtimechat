const express = require("express");
const app = express();
const http = require("http").createServer(app);

http.listen(3000, () => {
  console.log("server is running...");
});

app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// socket connection
const io = require("socket.io")(http);
io.on("connection", (socket) => {
  console.log("connected");
  socket.on("username", (username) => {
    console.log(username, "ee");
    socket.broadcast.emit("update", username + "joined");
  });
  socket.on("chat", (message) => {
    console.log(message, "ss");
    socket.broadcast.emit("chat", message);
  });
});
