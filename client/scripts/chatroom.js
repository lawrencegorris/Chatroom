let socket = io.connect();

socket.on('message', message => {
    console.log(message);
});

// Sending chat message to server
const sendAllButton = document.querySelector('#send-all-button');

sendAllButton.addEventListener('click', () => {
    const message = document.querySelector('#user-message').value;
    console.log('send message to all: ' + message);
    socket.emit('sendToAll', (message));
});

const sendSelfButton = document.querySelector('#send-self-button');
sendSelfButton.addEventListener('click', () => {
    const message = document.querySelector('#user-message').value;
    console.log('send message to myself' + message);
    socket.emit('sendToSelf', (message));
});

// Return message from server
const chatBox = document.querySelector('#chat-box');

socket.on('displayMessage', (message) => {
    chatBox.innerHTML += '<br>' + message;
});