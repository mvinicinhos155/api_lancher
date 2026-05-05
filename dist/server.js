"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = require("./database/database");
require("./models/User");
require("./models/Produto");
require("./models/Pedido");
require("./models/Pedido_Produto");
require("./models/Relations");
const port = process.env.PORT;
app_1.default.listen(port, () => {
    console.log("Servidor rodando na porta:", port);
});
async function test() {
    try {
        await database_1.sequelize.authenticate();
        console.log("conectado com sucesso!");
    }
    catch (error) {
        console.error("Erro ao conectar", error);
    }
    ;
}
;
test();
async function start() {
    await database_1.sequelize.sync({ force: true });
    console.log("Tabela criada com sucesso");
}
start();
