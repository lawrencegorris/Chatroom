// Server setup

const express = require('express');
const http = require('http');

const app = express();
const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));
const server = http.createServer(app);

server.listen(8080, () => {
    console.log('server running on port: 8080');
});

// Socket.io setup
const io = require('socket.io')(server);

// Checks how many users are connected to current socket

let counter = 0;

// Array to keep users
let usersConnected = [{}];

// Function for counter when user connects

function counterUserConnects() {
    counter++;
    if(counter > usersConnected)
    if (counter == 1) {
        console.log(counter + ' user connected');
    } else {
        console.log(counter + ' users connected');
    }
}

// Function for counter when user disconnects

function counterUserDisonnects() {
    counter--;
    if (counter == 1) {
        console.log(counter + ' user connected');
    } else {
        console.log(counter + ' users connected');
    }
}

// FINDING USER

function findUser(id) {
    let userIndex = usersConnected.findIndex((element) => element.socketId === id);
    let user = usersConnected[userIndex];
    return user;
}

// Show user count
function showUserAmount(counter){
    console.log(counter);
    io.emit('showUserAmount', counter);
}

// What happens on connect/disconnect

io.on('connection', socket => {

    counterUserConnects();

    // Message when user connects
    socket.on('newUserConnect', (username) => {
        usersConnected.push({ username: username, socketId: socket.id });
        console.log(username + ' connnected');
        socket.emit('displayMessage', 'You joined');
        socket.broadcast.emit('userConnected', username);
        console.log(usersConnected);
        showUserAmount(counter);
    });

    socket.on('disconnect', (command) => {
        //console.log(usersConnected);
        let user = findUser(socket.id);
        counterUserDisonnects();
        //console.log(user);
        if(user){
            usersConnected.splice(user, 1);
            console.log('user ' + user.username + ' disconnected');
            io.emit('displayMessage', `${user.username} left the chat`);
        }
        showUserAmount(counter);
    });

    // Sending message to everyone
    socket.on('sendToAll', (message) => {
        let user = findUser(socket.id);
        //console.log('sending message to all: ' + message);
        socket.broadcast.emit('displayMessage', `${user.username}: ${message}`);
        socket.emit('displayMessage', ('You: ' + message));
    });

    // Sending message to yourself
    socket.on('sendToSelf', (message) => {
        //console.log('sending message to self: ' + message);
        socket.emit('displayMessage', (message));
    });
});
