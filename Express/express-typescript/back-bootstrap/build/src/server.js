"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var http_1 = require("http");
var socket = require('socket.io');
var port = Number(process.env.PORT) || 3000;
var server = (0, http_1.createServer)(app_1.default);
var io = socket(server);
server.listen(port, function () {
    console.log(port + " \uD3EC\uD2B8\uB85C \uC2E4\uD589\uB428");
});
var socketList = [];
io.on('connection', function (socket) {
    socketList.push(socket);
    console.log('SOCKET !!');
    socket.on('SEND', function (msg) {
        socketList.forEach(function (item, index) {
            console.log(item.id);
            if (item != socket) {
                item.emit("SEND", msg);
            }
        });
    });
    socket.on('disconnect', function () {
        socketList.splice(socketList.indexof(socket), 1);
    });
});
exports.default = {
    server: server,
    io: io
};
//# sourceMappingURL=server.js.map