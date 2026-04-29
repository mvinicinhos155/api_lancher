import app from "./app";
import { sequelize } from "./database/database";
import "./models/User"
import "./models/Produto"
import "./models/Pedido"
import "./models/Pedido_Produto"

import "./models/Relations"

const port = process.env.PORT as string;

app.listen(port, () => {
    console.log("Servidor rodando na porta:", port);
});

async function test () {
    try {
        await sequelize.authenticate()
        console.log("conectado com sucesso!")
    } catch (error) {
        console.error("Erro ao conectar", error)
    };
};

test();

async function start () {
    await sequelize.sync({force: true })
    console.log("Tabela criada com sucesso");
}


start()

