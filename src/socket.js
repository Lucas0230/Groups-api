
import Messages from './app/services/messages';

export default (socket) => {

    socket.emit('connection');

    socket.on("join", ({ room }) => {
        console.log('SALA ', room)
        socket.join(room)
    })

    socket.on("message", ({ message, room, userId, time, name }) => {

        socket.to(room).emit('newMessage', {
            message: message ? message : 'Mensagem Vazia',
            userId: userId ? userId : false,
            time: time ? time : new Date(),
            name: name ? name : ''
        })
        socket.emit('newMessage', {
            message: message ? message : 'Mensagem Vazia',
            userId: userId ? userId : false,
            time: time ? time : new Date(),
            name: name ? name : ''
        })

        Messages.store(room, userId, message, name)
    })

};