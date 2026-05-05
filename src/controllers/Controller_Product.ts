import { Product } from "../models/Produto";
import { Request, Response } from "express";
import { Payload } from "../middlewares/auth";

type BodyProduct = {
    name_product: string
    price: number
    about: string
    categoria: string
    img: string
}

interface AuthRequest extends Request {
    user?: Payload
    file?: any
}

class Controller_Product {
    async createProduct(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const { name_product, price, about, categoria } = req.body as BodyProduct;

            const fileName = req.file?.filename;
            const fileUrl = "https://api-lancher.onrender.com"
            const baseUrl = `${fileUrl}/uploads/${fileName}`;

            const product =  await Product.create({
                name_product,
                price,
                about, 
                categoria,
                img: baseUrl
            });
                if(!product) {
                    return res.status(400).json({ error: "Erro ao criar produto"});
                };
            
            return res.status(201).json({ message: "Produto criado com sucesso", product});
        } catch(error) {
            console.error("Erro interno do servidor", error);
            return res.status(500).json({ error: "Erro interno do servidor"});
        }
    };

    async getAllProducts(req: Request, res: Response): Promise<Response> {
        try {
            const products = await Product.findAll();
                if(!products) {
                    return res.status(404).json({ error: "Erro ao pegar todos produtos"});
                };

            return res.status(200).json({ message: "Todos os produtos", products});
        } catch(error) {
            console.error("Erro interno do servidor");
            return res.status(500).json({ error: "Erro interno do servidor"});
        }
    }

    async deleteProduto(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const id = req.params.id;
            const product = await Product.findOne({
                where: { id }
            });
                if(!product) {
                    return res.status(404).json({ error: "Erro ao pegar produto"});
                };

            const deleteProduto = await Product.destroy({
                where: { id }
            });
                if(!deleteProduto){
                    return res.status(404).json({ error: "Erro ao excluir produto"});
                };

            return res.status(204).json({message: "Produto deletado com sucesso", product})
        } catch(error) {
            console.error("Erro interno do servidor");
            return res.status(500).json({ error: "Erro interno do servidor"});
        }
    };

    async editProduto(req: AuthRequest, res: Response) {
        try {
            const id = Number(req.params.id);
            const { name_product, price } = req.body as BodyProduct;
            
            const update = await Product.update(
                {
                    name_product,
                    price,
                }, 
                {where: { id: id }}
            );
                if(!update) {
                    return res.status(404).json({ message: "Erro ao atualizar produto"});
                }
            return res.status(201).json({ message: "Produto autualizado", update});
        } catch(error) {
            console.error("Erro interno do servidor");
            return res.status(500).json({ error: "Erro interno do servidor"});
        }
    }
}

export default new Controller_Product;