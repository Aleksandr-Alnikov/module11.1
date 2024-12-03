const user1MessagesDiv = document.getElementById('user1Messages');
const user2MessagesDiv = document.getElementById('user2Messages');

const socket1 = new WebSocket('ws://localhost:8080');
const socket2 = new WebSocket('ws://localhost:8080');

socket1.onopen = function() {
    console.log('Подключение 1 установлено');
};

socket2.onopen = function() {
    console.log('Подключение 2 установлено');
};

function handleMessage(event, receivingDiv) {
    try {
        const messageData = JSON.parse(event.data);
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.textContent = messageData.message;

        receivingDiv.appendChild(messageElement);
        receivingDiv.scrollTop = receivingDiv.scrollHeight;
    } catch (error) {
        console.error('Ошибка', error);
    }
}

socket1.onmessage = function(event) {
    handleMessage(event, user1MessagesDiv);
};

socket2.onmessage = function(event) {
    handleMessage(event, user2MessagesDiv);
};

document.getElementById('user1SendButton').onclick = function() {
    const message = document.getElementById('user1Input').value;
    if (message.trim() !== "") {
        const messageData = JSON.stringify({
            sender: 'Пользователь 1',
            message: message.trim()
        });
        socket1.send(messageData);
        document.getElementById('user1Input').value = "";
    }
};

document.getElementById('user2SendButton').onclick = function() {
    const message = document.getElementById('user2Input').value;
    if (message.trim() !== "") {
        const messageData = JSON.stringify({
            sender: 'Пользователь 2',
            message: message.trim()
        });
        socket2.send(messageData);
        document.getElementById('user2Input').value = "";
    }
};