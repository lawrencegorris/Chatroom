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

io.on('connection', socket => {
    console.log('someone connected');
});