"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
;
const auth = (req, res, next) => {
    const authHeaders = req.headers.authorization;
    if (!authHeaders) {
        return res.status(400).json({ error: "Token invalido, tente novamente!" });
    }
    ;
    const token = authHeaders.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error("Erro interno do servidor", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
};
exports.auth = auth;
const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: "Não autorizado" });
    }
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({ error: "Acesso negado!" });
    }
    ;
    next();
};
exports.isAdmin = isAdmin;
