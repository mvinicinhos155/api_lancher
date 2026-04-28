import { PedidoProduct } from "../models/Pedido_Produto";
import { Payload } from "../middlewares/auth";
import { Request, Response } from "express";
import { Pedido } from "../models/Pedido";
import { Product } from "../models/Produto";

export type BodyPedidoProduto = {
   product_id: number
   quantidade: number
   price: number
};

interface AuthRequest extends Request {
    user?: Payload
};

class Controller_Pedido_Produto {
    async createPedidoProduto(req: AuthRequest, res: Response): Promise<Response> {
        try {
            if(!req.user) {
                return res.status(404).json({ error: "Erro ao pegar dados do usúario"});
            };
            const userId = req.user.id;
            const pedido = await Pedido.findOne({
                where: { user_id: userId }
            });
                if(!pedido) {
                    return res.status(404).json({ error: "Erro ao pegar o pedido"});
                };

            const products: BodyPedidoProduto[] = req.body;

            const itens = products.map((p: BodyPedidoProduto) => ({
                pedido_id: pedido.id,
                product_id: p.product_id,
                quantidade: p.quantidade,
                price: p.price
            }));

            const total = products.reduce((acc: number, p: BodyPedidoProduto) => {
                return acc + (Number(p.price) * (p.quantidade));
            }, 0);

            const createPedidoP = await PedidoProduct.bulkCreate(itens);
                if(!createPedidoP) {
                    return res.status(404).json({ error: "Erro ao criar pedido"});
                }

            return res.status(201).json({ message: "Pedido criado com sucesso!", createPedidoP, total});
        } catch(error) {
            console.log("Erro interno do servidor", error);
            return res.status(500).json({ error: "Erro interno do servidor"});
        };
    }

    async getAllPedidoProdutoUser(req: AuthRequest, res: Response): Promise<Response> {
        try {

            if(!req.user) {
                return res.status(404).json({ error: "Erro ao pegar dados do usúario"});
            }
            const userId = req.user.id;
            const pedido = await Pedido.findOne({
                where: { user_id: userId }
            });
                if(!pedido) {
                    return res.status(404).json({ error: "Erro ao pegar o pedido"});
                };
            

            const getPedidoUser = await PedidoProduct.findAll({
                include: {
                    model: Product,
                    as: "produto"
                },
                where: {pedido_id: pedido.id}
            });
                if(!getPedidoUser) {
                    return res.status(404).json({ error: "Erro ao pegar pedidos do cliente"});
                };

            return res.status(200).json({ message: "Historico de pedidos", getPedidoUser});
        } catch(error) {
            console.log("Erro interno do servidor", error);
            return res.status(500).json({ error: "Erro interno do servidor"});
        };
    }

    async getAllPedidoProdutoUsers(req: Request, res: Response): Promise<Response> {
        try {
            const usersPedidos = await PedidoProduct.findAll({
                include: {
                    model: Product,
                    as: "produto",
                    attributes: ["name_product", "price"]
                }
            });
                if(!usersPedidos) {
                    return res.status(404).json({ error: "Erro ao pegar todos os pedidos"});
                };
            
            return res.status(200).json({ message: "Pedidos listado com sucesso", usersPedidos})
        } catch(error) {
            console.log("Erro interno do servidor", error);
            return res.status(500).json({ error: "Erro interno do servidor"});
        };
    };

    /*async deleteOnePedidoProduto(req: AuthRequest, res:Response): Promise<Response> {
        try {
            if(!req.user) {
                return res.status(404).json({ error: "Erro com usúario"});
            };

            const UserId = req.user.id;
        } catch(error) {
            console.log("Erro interno do servidor", error);
            return res.status(500).json({ error: "Erro interno do servidor"});
        };
    }*/
}

export default new Controller_Pedido_Produto;