const path = require("path");
const http = require('http');
const express = require("express");
const socketio = require('socket.io');
const formatMessage = require('./utils/messages')
const {userJoin, getCurrentUser} = require('./utils/users')

const app = express();
const server = http.createServer(app)
const io = socketio(server);

const PORT = process.env.PORT || 3000;

const botName = 'Admin'

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

io.on('connection', socket => {

    socket.on('joinRoom', ({ username, room }) => {

        const user = userJoin(socket.id, username, room);

        socket.join(user.room)

        // Welcome current user
        socket.emit('message', formatMessage(botName, 'Welcome to the chat app'));

        // Broadcast when a new user connects
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));

    })

    // Listening Chat message
    socket.on('chatMessage', chatMessage => {
        io.emit('message', formatMessage('USER', chatMessage));
    })

    //Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'A user has left the chat'))
    })
})

server.listen(PORT, () => {
    console.log(`Server listen at: ${PORT}`)
})