const username = prompt('Please type in your username: ');

let socket = io.connect();

socket.emit('newUserConnect', username);
  
const messageInput = document.querySelector('#user-message');

// Sending chat message to all
const sendAllButton = document.querySelector('#send-all-button');

sendAllButton.addEventListener('click', () => {
    const message = messageInput.value;
    socket.emit('sendToAll', message);
    messageInput.value = '';
});

// Sending chat message to self

const sendSelfButton = document.querySelector('#send-self-button');

sendSelfButton.addEventListener('click', () => {
    const message = messageInput.value;
    socket.emit('sendToSelf', ('You: ' + message));
    messageInput.value = '';
});

// Return message from server
const chatBox = document.querySelector('#chat-box');

socket.on('displayMessage', (message) => {
    chatBox.innerHTML += '<br>' + message;
});

socket.on('userConnected', (username) => {
    chatBox.innerHTML += '<br>' + `${username} is now connected`;
});