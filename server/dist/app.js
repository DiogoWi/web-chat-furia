"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
class App {
    app;
    server;
    socketIo;
    constructor() {
        this.app = (0, express_1.default)();
        this.server = (0, http_1.createServer)(this.app);
        this.socketIo = new socket_io_1.Server(this.server, {
            cors: {
                origin: '*'
            }
        });
        this.socketIo.on('connection', socket => {
            console.log('conectou');
            socket.on('entrarNaSala', async (sala) => {
                socket.join(sala);
                const socketsNaSala = await this.socketIo.in(sala).fetchSockets();
                console.log(`Usuário entrou na sala ${sala}.\nTem ${socketsNaSala.length} usuários nesta sala.`);
            });
            socket.on('mensagem', ({ sala, mensagem }) => {
                socket.to(sala).emit('mensagem', mensagem);
            });
        });
    }
}
exports.default = App;
