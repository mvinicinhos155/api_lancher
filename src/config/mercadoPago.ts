import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
  options: {
    timeout: 5000,
  },
});

export class MercadoPagoProvider {
  async createPix({ valor, pedidoId }: { valor: any; pedidoId: string }) {
    try {
      const payment = new Payment(client);
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

    } catch (error: any) {
        throw new Error("Erro ao gerar pagamento Pix");
    }
  }
}