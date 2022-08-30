const path = require("path");
const http = require('http');
const express = require("express");
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app)
const io = socketio(server);

const PORT = process.env.PORT || 3000;

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

io.on('connection', socket => {
    console.log("New Ws Connection")

    // Welcome current user
    socket.emit('message', 'Welcome to the chat app');

    // Broadcast when a new user connects
    socket.broadcast.emit('message', 'A new user has joined the chat');

    //Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat')
    })
})

server.listen(PORT, () => {
    console.log(`Server listen at: ${PORT}`)
})