const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io')
const cors = require('cors');

app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://192.168.1.19:3000",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    let count = 0;
    socket.on('click_button', (data) => {
        socket.broadcast.emit("received_control", {direction: data})
    })
})

server.listen(3001, "192.168.1.19", () => {
    console.log("SERVER RUNNING at http://192.168.1.19:3000")
})