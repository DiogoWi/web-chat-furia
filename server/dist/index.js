import App from "./app.js";
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const jsonServer = require('json-server');
const app = new App();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
app.app.use(middlewares);
app.app.use('/api', router);
app.server.listen(process.env.PORT || 3333, () => {
    console.log('Servidor iniciado!');
});
app.app.get('/', (_, res) => {
    res.send("Servidor rodando");
});
