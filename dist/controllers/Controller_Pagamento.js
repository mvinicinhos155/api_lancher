"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagamento = void 0;
const mercadoPago_1 = require("../config/mercadoPago");
const Pedido_1 = require("../models/Pedido");
const Pedido_Produto_1 = require("../models/Pedido_Produto");
;
class Pagamento {
    async handle(req, res) {
        if (!req.user) {
            return res.status(404).json({ error: "Erro com Usúario" });
        }
        ;
        const UserId = req.user.id;
        const pedido = await Pedido_1.Pedido.findOne({
            include: {
                model: Pedido_Produto_1.PedidoProduct,
                as: "produtos"
            },
            where: { user_id: UserId }
        });
        if (!pedido) {
            return res.status(404).json({ error: "Pedido não existe" });
        }
        ;
        const total = pedido?.produtos?.reduce((acc, p) => {
            return acc + Number((p.price) * (p.quantidade));
        }, 0);
        const provider = new mercadoPago_1.MercadoPagoProvider();
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
exports.Pagamento = Pagamento;
