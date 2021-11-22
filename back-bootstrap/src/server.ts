import app from "./app";
import {createServer} from "http";
const socket = require('socket.io');

const port: number = Number(process.env.PORT) || 3000;

const server = createServer(app);
const io = socket(server);

server.listen(port, () => {
    console.log(`${port}포트로 실행됨`);
});

let socketList = [] as any;

io.on('connection',(socket: any) => {
    socketList.push(socket);
    console.log('SOCKET !!');

    socket.on('SEND',(msg: string) => {
        socketList.forEach((item: any,index: number) => {
            console.log(item.id);
            if(item != socket){
                item.emit("SEND",msg);
            }
        });
    });

    socket.on('disconnect',() => {
        socketList.splice(socketList.indexof(socket), 1);
    });
});

export default {
    server,
    io
};