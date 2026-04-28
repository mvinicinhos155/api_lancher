"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./User");
const Produto_1 = require("./Produto");
const Pedido_1 = require("./Pedido");
const Pedido_Produto_1 = require("./Pedido_Produto");
User_1.User.hasMany(Produto_1.Product, {
    foreignKey: "user_id"
});
Produto_1.Product.belongsTo(User_1.User, {
    foreignKey: "user_id"
});
User_1.User.hasMany(Pedido_1.Pedido, {
    foreignKey: "user_id"
});
Pedido_1.Pedido.belongsTo(User_1.User, {
    foreignKey: "user_id",
    as: "user"
});
Pedido_Produto_1.PedidoProduct.belongsTo(Produto_1.Product, {
    foreignKey: "product_id",
    as: "produto"
});
Pedido_Produto_1.PedidoProduct.belongsTo(Pedido_1.Pedido, {
    foreignKey: "pedido_id",
    as: "pedido"
});
Pedido_1.Pedido.hasMany(Pedido_Produto_1.PedidoProduct, {
    foreignKey: "pedido_id",
    as: "produtos"
});
