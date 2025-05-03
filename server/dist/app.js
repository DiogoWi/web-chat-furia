import express from 'express';
import { createServer } from 'http';
import { Server as Io } from 'socket.io';
class App {
    app;
    server;
    socketIo;
    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.socketIo = new Io(this.server, {
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
export default App;
