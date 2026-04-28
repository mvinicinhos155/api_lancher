import { Pedido } from "../models/Pedido";
import { Request, Response } from "express";

import { Payload } from "../middlewares/auth";
import { User } from "../models/User";
import { PedidoProduct } from "../models/Pedido_Produto";
import { Product } from "../models/Produto";

interface AuthRequest extends Request {
    user?: Payload
};

class Controller_Pedido {
    async createPedido(req: AuthRequest, res: Response): Promise<Response> {
        try {
            if (!req.user) {
                return res.status(404).json({ error: "Erro ao pegar informção do usúario" });
            };

            const UserId = req.user.id;
            const pedido = await Pedido.create({
                user_id: UserId,
                status: "PENDENTE",

            });
            if (!pedido) {
                return res.status(404).json({ error: "Erro ao realizar pedido" });
            };

            return res.status(201).json({ message: "Pedido realizado", pedido });
        } catch (error) {
            console.error("Erro interno do servidor", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async getAllPedido(req: Request, res: Response): Promise<Response> {
        try {
            const GetPedidos = await Pedido.findAll({
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: ["id", "name", "role"]
                    },
                    {
                        model: PedidoProduct,
                        as: "produtos",
                        include: [
                            {
                            model: Product,
                            as: "produto",
                            attributes: ["name_product", "price", "img"]
                            }
                        ]
                    }
                ]
            });
            if (!GetPedidos) {
                return res.status(404).json({ error: "Erro ao pegar todos os pedidos" });
            };

            return res.status(200).json({ message: "Pedido listado com sucesso", GetPedidos });
        } catch (error) {
            console.error("Erro interno do servidor", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        };
    };

    async getAllUserPedidos(req: AuthRequest, res: Response): Promise<Response> {
        try {
            if (!req.user) {
                return res.status(404).json({ error: "Erro ao pegar dados do usúario" });
            }

            const user_id = req.user.id;
            const GetAllUserPedidos = await Pedido.findAll({
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: ["name"]
                    },
                    {
                        model: PedidoProduct,
                        as: "produtos",
                        include: [
                            {
                            model: Product,
                            as: "produto",
                            attributes: ["name_product", "price", "img"]
                            }
                        ]
                    }
                ],
                where: { user_id: user_id }
            });

            if (!GetAllUserPedidos) {
                return res.status(404).json({ error: "Erro ao pegar dados dos pedidos" })
            };

            return res.status(200).json({ message: "Pedidos listado com sucesso", GetAllUserPedidos });
        } catch (error) {
            console.error("Erro interno do servidor", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        };
    };

    async dellPedido(req: AuthRequest, res: Response): Promise<Response> {
        try {
            if (!req.user) {
                return res.status(404).json({ error: "Erro ao pegar dados do usúario" });
            };
            const UserId = req.user.id;
            const dellpedido = await Pedido.destroy({
                where: { user_id: UserId }
            });

            if (!dellpedido) {
                return res.status(404).json({ error: "Erro ao deletar pedido" });
            };

            return res.status(203).json({ message: "Pedido deletado" });
        } catch (error) {
            console.error("Erro interno do servidor", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        };
    }
};

export default new Controller_Pedido;