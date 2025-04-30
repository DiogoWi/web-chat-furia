import express from 'express';
import { Server, createServer } from 'http';
import { Server as Io } from 'socket.io';

class App {
    public app: express.Application;
    public server: Server;
    private socketIo: Io;

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

            socket.on('entrarNaSala', async sala => {
                socket.join(sala);
                const socketsNaSala = await this.socketIo.in(sala).fetchSockets();
                console.log(socketsNaSala.length)
                console.log(`Usuário entrou na sala ${sala}`);
            });

            socket.on('mensagem', ({ sala, mensagem }) => {
                socket.to(sala).emit('mensagem', mensagem)
            });
        })
    }
}

export default App;