const socket = new WebSocket('ws://localhost:8080');
const messagesDiv = document.getElementById('messages');

socket.onopen = function() {
    console.log('Подключено к серверу');
};

socket.onmessage = function(event) {
    const message = document.createElement('div');
    message.textContent = event.data;
    messagesDiv.appendChild(message);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

document.getElementById('user1SendButton').onclick = function() {
    const message = document.getElementById('user1Input').value;
    if (message.trim() !== "") {
        socket.send(`Пользователь 1: ${message.trim()}`);
        document.getElementById('user1Input').value = "";
    }
};

document.getElementById('user2SendButton').onclick = function() {
    const message = document.getElementById('user2Input').value;
    if (message.trim() !== "") {
        socket.send(`Пользователь 2: ${message.trim()}`);
        document.getElementById('user2Input').value = "";
    }
};