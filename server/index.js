const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io')
const cors = require('cors');

app.use(cors())

const server = http.createServer(app);
const ipLocal = "192.168.1.19"
const io = new Server(server, {
    cors: {
        origin: "http://" + ipLocal + ":3000",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    let count = 0;
    socket.on('click_button', (data) => {
        socket.broadcast.emit("received_control", {control: data})
    })
})

server.listen(3001, ipLocal, () => {
    console.log("SERVER RUNNING at http://" + ipLocal + ":3000")
})