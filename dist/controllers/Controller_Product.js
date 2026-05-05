"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Produto_1 = require("../models/Produto");
class Controller_Product {
    async createProduct(req, res) {
        try {
            const { name_product, price, about, categoria } = req.body;
            const fileName = req.file?.filename;
            const fileUrl = "https://api-lancher.onrender.com";
            const baseUrl = `${fileUrl}/uploads/${fileName}`;
            const product = await Produto_1.Product.create({
                name_product,
                price,
                about,
                categoria,
                img: baseUrl
            });
            if (!product) {
                return res.status(400).json({ error: "Erro ao criar produto" });
            }
            ;
            return res.status(201).json({ message: "Produto criado com sucesso", product });
        }
        catch (error) {
            console.error("Erro interno do servidor", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
    ;
    async getAllProducts(req, res) {
        try {
            const products = await Produto_1.Product.findAll();
            if (!products) {
                return res.status(404).json({ error: "Erro ao pegar todos produtos" });
            }
            ;
            return res.status(200).json({ message: "Todos os produtos", products });
        }
        catch (error) {
            console.error("Erro interno do servidor");
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
    async deleteProduto(req, res) {
        try {
            const id = req.params.id;
            const product = await Produto_1.Product.findOne({
                where: { id }
            });
            if (!product) {
                return res.status(404).json({ error: "Erro ao pegar produto" });
            }
            ;
            const deleteProduto = await Produto_1.Product.destroy({
                where: { id }
            });
            if (!deleteProduto) {
                return res.status(404).json({ error: "Erro ao excluir produto" });
            }
            ;
            return res.status(204).json({ message: "Produto deletado com sucesso", product });
        }
        catch (error) {
            console.error("Erro interno do servidor");
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
    ;
    async editProduto(req, res) {
        try {
            const id = Number(req.params.id);
            const { name_product, price } = req.body;
            const update = await Produto_1.Product.update({
                name_product,
                price,
            }, { where: { id: id } });
            if (!update) {
                return res.status(404).json({ message: "Erro ao atualizar produto" });
            }
            return res.status(201).json({ message: "Produto autualizado", update });
        }
        catch (error) {
            console.error("Erro interno do servidor");
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}
exports.default = new Controller_Product;
