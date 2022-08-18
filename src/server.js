

// Start API
import app from './app';

app.listen(3095, () => {
    console.log('API START 3095!')
})

// Start socket.io
import { createServer } from "http";
import { Server } from "socket.io";

import socketRules from './socket'

console.log

var STATIC_CHANNELS = [{
    name: 'Global chat',
    participants: 0,
    id: 1,
    sockets: []
}, {
    name: 'Funny',
    participants: 0,
    id: 2,
    sockets: []
}];

const httpServer = createServer();
const io = new Server(httpServer, {
    // options
});

io.serveClient(false);

io.listen(3000);

io.on("connection", (socket) => { socketRules(socket) });

httpServer.listen(3040, () => {
    console.log('SERVER START 3040!')
});
