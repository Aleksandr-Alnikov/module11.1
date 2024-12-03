const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

const clients = new Set();

server.on('connection', (socket) => {
    console.log('Новый клиент подключен');
    clients.add(socket);

    socket.on('message', (message) => {
        clients.forEach(client => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    socket.on('close', () => {
        console.log('Клиент отключен');
        clients.delete(socket);
    });
    socket.send('Добро пожаловать в чат!');
});

console.log('Сервер запущен на порту 8080');