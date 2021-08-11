// Server setup

const express = require('express');
const http = require('http');

const app = express();
const clientPath = `${__dirname}/../client`;
app.use (express.static(clientPath));
const server = http.createServer(app);

server.listen(8080, () => {
    console.log('server running on port: 8080');
});

// Socket.io setup
const io = require('socket.io')(server);

// Checks how many users are connected to current socket

let counter  = 0;

// Function for counter when user connects
 
function counterUserConnects() { 
    counter++;
    if(counter == 1){
        console.log(counter + ' user connected');
    }else {
        console.log(counter + ' users connected');
    }
}

// Function for counter when user disconnects

function counterUserDisonnects() { 
    counter--;
    if(counter == 1){
        console.log(counter + ' user connected');
    }else {
        console.log(counter + ' users connected');
    }
}

// What happens on connect/disconnect

io.on('connection', socket => {
    counterUserConnects();

    // Console log when user connects
    socket.emit('message', 'Welcome to the Memeroom user with socket: ' + socket.id);

    // Console log when user disconnects
    socket.on('disconnect', () => {
        console.log('a user disconnected');
        counterUserDisonnects();
    });

    // Sending message to everyone
    socket.on('sendToAll', (message) => {
        console.log('sending message to all: ' + message);
        io.emit('displayMessage', (message));
    });

    // Sending message to yourself
    socket.on('sendToSelf', (message) => {
        console.log('sending message to self: ' + message);
        socket.emit('displayMessage', (message));
    });
});
