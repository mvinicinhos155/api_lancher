import { Request, Response } from "express";
import { Payload } from "../middlewares/auth";
import { MercadoPagoProvider } from "../config/mercadoPago";
import { Pedido } from "../models/Pedido";
import { PedidoProduct } from "../models/Pedido_Produto";

interface AuthRequest extends Request {
    user?: Payload
};

export class Pagamento {
    async handle (req: AuthRequest, res: Response): Promise<Response> {
        if(!req.user) {
            return res.status(404).json({ error: "Erro com Usúario"});
        };

        const UserId = req.user.id;
        const pedido = await Pedido.findOne({
            include: {
                model: PedidoProduct,
                as: "produtos"
            },
            where: { user_id: UserId}
        });

            if(!pedido) {
                return res.status(404).json({ error: "Pedido não existe"});
            };

        const total = pedido?.produtos?.reduce((acc: number, p: any) => {
            return acc + Number((p.price) * (p.quantidade)); 
        }, 0)

        const provider = new MercadoPagoProvider();

        const result = await provider.createPix({
         valor: total,
         pedidoId: "123"
        });


        return res.status(201).json({
            "message": "Pix", 
            result, total
         });
    }
}