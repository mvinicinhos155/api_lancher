"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pedido = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
class Pedido extends sequelize_1.Model {
}
exports.Pedido = Pedido;
Pedido.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("PENDENTE", "PREPARANDO", "SAIU_PARA_ENTREGA", "ENTREGUE"),
        defaultValue: "PENDENTE",
        allowNull: false
    }
}, {
    sequelize: database_1.sequelize,
    timestamps: true,
    tableName: "pedido"
});
