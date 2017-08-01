import * as socketIo from 'socket.io';
import * as http from 'http';

export let ws;

export function io (app: http.Server) {
    ws = socketIo(app);
    ws.on('connection', (socket) => ws.emit('hello', 'hello'));
}