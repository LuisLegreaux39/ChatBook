const http = require('http');
const cors = require('cors');
const express = require('express');
const { Server } = require('socket.io');


class SERVER {
    httpServer;
    io;
    constructor() {
        let app = express();
        app.use(cors)
        this.httpServer = http.createServer(app);
        this.initSocketSettings();
        this.initSocket()
    }
    initSocketSettings = () => {
        return this.io = new Server(this.httpServer, {
            cors: {
                origin: "http://localhost:3000",
                methods: ['GET', 'POST']
            }
        })
    }

    initSocket = () => {
        // Creating connection on the socket when opening the app
        return this.io.on('connection', socket => {
            console.log(`Creating socket connection ID==> ${socket.id}`);

            // Capting event when selecting a room to join
            socket.on('JOIN_ROOM', (data) => {
                socket.join(data.currentRoom);
                console.log(`User : ${data.userName} just join the room : ${data.currentRoom}`)
            })
            // Reading a event when message is sent
            socket.on('SEND_MESSAGE', data => {
                console.log(`Messgage from ${data.author} ==>${data.message} on Room :${data.room}`);
                socket.to(data.room).emit('RECIEVE_MESSAGES', data);
            })
            // Disconneting from the socket when closing the tab on the browser
            socket.on('disconnect', () => {
                console.log("Desconectando")
            })
        })
    }

    initiServer = (PORT = '3001') => {
        return this.httpServer.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    }

}

module.exports = SERVER;

