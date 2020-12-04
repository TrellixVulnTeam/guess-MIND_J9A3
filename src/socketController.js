import events from "./events"

const socketController = (socket) => {
    //on assets/js/login.js
    const broadcast = (event, data) => socket.broadcast.emit(event, data)

    socket.on(events.setNickName, ({nickname}) =>{
        socket.nickname = nickname;
        broadcast(events.newUser, { nickname });
    });
    socket.on(events.disconnect, () => {
        broadcast(events.disconnected, { nickname : socket.nickname });
    });
    socket.on(events.sendMsg, ({message}) => {
        broadcast(events.newMsg, { message, nickname : socket.nickname });
    });

}


export default socketController