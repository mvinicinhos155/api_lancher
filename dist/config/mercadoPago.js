"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercadoPagoProvider = void 0;
const mercadopago_1 = require("mercadopago");
const client = new mercadopago_1.MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
    options: {
        timeout: 5000,
    },
});
class MercadoPagoProvider {
    async createPix({ valor, pedidoId }) {
        try {
            const payment = new mercadopago_1.Payment(client);
            const response = await payment.create({
                body: {
                    transaction_amount: valor,
                    description: "Pagamento Pix teste",
                    payment_method_id: "pix",
                    payer: {
                        email: "test_user_123@testuser.com",
                        first_name: "Marcio",
                        last_name: "Teste",
                        identification: {
                            type: "CPF",
                            number: "19119119100"
                        }
                    }
                }
            });
            const data = response.point_of_interaction?.transaction_data;
            return {
                qrCode: data?.qr_code_base64,
                copiaCola: data?.qr_code,
            };
        }
        catch (error) {
            throw new Error("Erro ao gerar pagamento Pix");
        }
    }
}
exports.MercadoPagoProvider = MercadoPagoProvider;
