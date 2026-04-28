import { User } from "./User";
import { Product } from "./Produto";
import { Pedido } from "./Pedido";
import { PedidoProduct } from "./Pedido_Produto";


User.hasMany(Product, {
    foreignKey: "user_id"
});

Product.belongsTo(User, {
    foreignKey: "user_id"
});

User.hasMany(Pedido, {
    foreignKey: "user_id"
});

Pedido.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
});


PedidoProduct.belongsTo(Product, {
    foreignKey: "product_id",
    as: "produto"
})

PedidoProduct.belongsTo(Pedido, {
    foreignKey: "pedido_id",
    as: "pedido"
})

Pedido.hasMany(PedidoProduct, {
  foreignKey: "pedido_id",
  as: "produtos"
})
