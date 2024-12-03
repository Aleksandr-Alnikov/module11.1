const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

const clients = new Set();

server.on('connection', (socket) => {
    clients.add(socket);

    socket.send(JSON.stringify({ sender: 'Сервер', message: 'Добро пожаловать в чат!' }));

    socket.on('message', (message) => {
        let messageData;
        try {
            const messageString = message.toString('utf8');

            messageData = JSON.parse(messageString);

            clients.forEach(client => {
                if (client !== socket && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(messageData));
                }
            });
        } catch (error) {
            console.error('Ошибка:', error);
        }
    });

    socket.on('close', () => {
        clients.delete(socket);
    });
});

console.log('Сервер запущен на порту 8080');