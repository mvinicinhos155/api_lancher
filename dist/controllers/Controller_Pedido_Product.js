"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pedido_Produto_1 = require("../models/Pedido_Produto");
const Pedido_1 = require("../models/Pedido");
const Produto_1 = require("../models/Produto");
;
class Controller_Pedido_Produto {
    async createPedidoProduto(req, res) {
        try {
            if (!req.user) {
                return res.status(404).json({ error: "Erro ao pegar dados do usúario" });
            }
            ;
            const userId = req.user.id;
            const pedido = await Pedido_1.Pedido.findOne({
                where: { user_id: userId }
            });
            if (!pedido) {
                return res.status(404).json({ error: "Erro ao pegar o pedido" });
            }
            ;
            const products = req.body;
            const itens = products.map((p) => ({
                pedido_id: pedido.id,
                product_id: p.product_id,
                quantidade: p.quantidade,
                price: p.price
            }));
            const total = products.reduce((acc, p) => {
                return acc + (Number(p.price) * (p.quantidade));
            }, 0);
            const createPedidoP = await Pedido_Produto_1.PedidoProduct.bulkCreate(itens);
            if (!createPedidoP) {
                return res.status(404).json({ error: "Erro ao criar pedido" });
            }
            return res.status(201).json({ message: "Pedido criado com sucesso!", createPedidoP, total });
        }
        catch (error) {
            console.log("Erro interno do servidor", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
        ;
    }
    async getAllPedidoProdutoUser(req, res) {
        try {
            if (!req.user) {
                return res.status(404).json({ error: "Erro ao pegar dados do usúario" });
            }
            const userId = req.user.id;
            const pedido = await Pedido_1.Pedido.findOne({
                where: { user_id: userId }
            });
            if (!pedido) {
                return res.status(404).json({ error: "Erro ao pegar o pedido" });
            }
            ;
            const getPedidoUser = await Pedido_Produto_1.PedidoProduct.findAll({
                include: {
                    model: Produto_1.Product,
                    as: "produto"
                },
                where: { pedido_id: pedido.id }
            });
            if (!getPedidoUser) {
                return res.status(404).json({ error: "Erro ao pegar pedidos do cliente" });
            }
            ;
            return res.status(200).json({ message: "Historico de pedidos", getPedidoUser });
        }
        catch (error) {
            console.log("Erro interno do servidor", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
        ;
    }
    async getAllPedidoProdutoUsers(req, res) {
        try {
            const usersPedidos = await Pedido_Produto_1.PedidoProduct.findAll({
                include: {
                    model: Produto_1.Product,
                    as: "produto",
                    attributes: ["name_product", "price"]
                }
            });
            if (!usersPedidos) {
                return res.status(404).json({ error: "Erro ao pegar todos os pedidos" });
            }
            ;
            return res.status(200).json({ message: "Pedidos listado com sucesso", usersPedidos });
        }
        catch (error) {
            console.log("Erro interno do servidor", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
        ;
    }
    ;
}
exports.default = new Controller_Pedido_Produto;
