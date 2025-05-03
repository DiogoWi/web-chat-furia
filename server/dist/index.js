"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const json_server_1 = __importDefault(require("json-server"));
const app = new app_1.default();
const router = json_server_1.default.router('db.json');
const middlewares = json_server_1.default.defaults();
app.app.use(middlewares);
app.app.use('/api', router);
app.server.listen(process.env.PORT || 3333, () => {
    console.log('Servidor iniciado!');
});
