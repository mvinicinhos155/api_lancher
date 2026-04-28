"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pedido_1 = require("../models/Pedido");
const User_1 = require("../models/User");
const Pedido_Produto_1 = require("../models/Pedido_Produto");
const Produto_1 = require("../models/Produto");
;
class Controller_Pedido {
    async createPedido(req, res) {
        try {
            if (!req.user) {
                return res.status(404).json({ error: "Erro ao pegar informção do usúario" });
            }
            ;
            const UserId = req.user.id;
            const pedido = await Pedido_1.Pedido.create({
                user_id: UserId,
                status: "PENDENTE",
            });
            if (!pedido) {
                return res.status(404).json({ error: "Erro ao realizar pedido" });
            }
            ;
            return res.status(201).json({ message: "Pedido realizado", pedido });
        }
        catch (error) {
            console.error("Erro interno do servidor", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
    async getAllPedido(req, res) {
        try {
            const GetPedidos = await Pedido_1.Pedido.findAll({
                include: [
                    {
                        model: User_1.User,
                        as: "user",
                        attributes: ["id", "name", "role"]
                    },
                    {
                        model: Pedido_Produto_1.PedidoProduct,
                        as: "produtos",
                        include: [
                            {
                                model: Produto_1.Product,
                                as: "produto",
                                attributes: ["name_product", "price", "img"]
                            }
                        ]
                    }
                ]
            });
            if (!GetPedidos) {
                return res.status(404).json({ error: "Erro ao pegar todos os pedidos" });
            }
            ;
            return res.status(200).json({ message: "Pedido listado com sucesso", GetPedidos });
        }
        catch (error) {
            console.error("Erro interno do servidor", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
        ;
    }
    ;
    async getAllUserPedidos(req, res) {
        try {
            if (!req.user) {
                return res.status(404).json({ error: "Erro ao pegar dados do usúario" });
            }
            const user_id = req.user.id;
            const GetAllUserPedidos = await Pedido_1.Pedido.findAll({
                include: [
                    {
                        model: User_1.User,
                        as: "user",
                        attributes: ["name"]
                    },
                    {
                        model: Pedido_Produto_1.PedidoProduct,
                        as: "produtos",
                        include: [
                            {
                                model: Produto_1.Product,
                                as: "produto",
                                attributes: ["name_product", "price", "img"]
                            }
                        ]
                    }
                ],
                where: { user_id: user_id }
            });
            if (!GetAllUserPedidos) {
                return res.status(404).json({ error: "Erro ao pegar dados dos pedidos" });
            }
            ;
            return res.status(200).json({ message: "Pedidos listado com sucesso", GetAllUserPedidos });
        }
        catch (error) {
            console.error("Erro interno do servidor", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
        ;
    }
    ;
    async dellPedido(req, res) {
        try {
            if (!req.user) {
                return res.status(404).json({ error: "Erro ao pegar dados do usúario" });
            }
            ;
            const UserId = req.user.id;
            const dellpedido = await Pedido_1.Pedido.destroy({
                where: { user_id: UserId }
            });
            if (!dellpedido) {
                return res.status(404).json({ error: "Erro ao deletar pedido" });
            }
            ;
            return res.status(203).json({ message: "Pedido deletado" });
        }
        catch (error) {
            console.error("Erro interno do servidor", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
        ;
    }
}
;
exports.default = new Controller_Pedido;
