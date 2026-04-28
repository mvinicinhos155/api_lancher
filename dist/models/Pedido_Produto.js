"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoProduct = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
;
class PedidoProduct extends sequelize_1.Model {
}
exports.PedidoProduct = PedidoProduct;
PedidoProduct.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    pedido_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    quantidade: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    sequelize: database_1.sequelize,
    timestamps: true,
    tableName: "pedido_product"
});
