const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io")
const PORT = 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

//id {x, y}

const users = new Map();




io.on("connection", (socket) => {
    console.log(`Client connected from ${socket.handshake.address}, ${socket.handshake.time}`)
    socket.on("spawn", (data) => {
      socket.data.user = data.id
      users.set(socket.data.user, data.position)
      io.emit("new user connected", [...users])
      console.log(users)
    })
    socket.on("disconnect", () => {
      console.log(`${socket.data.user} disconnected`)
      users.delete(socket.data.user)
      io.emit("user disconnected", socket.data.user)
      console.log(users)
    })
    socket.on("playerPos", (data) => {
      users.set(data.id, data.position)
      console.log(users)
      io.emit("playerPos", data)
    })
})






server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

