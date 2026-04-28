import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";

type validRole = "ADMIN" | "USER";

export interface Payload {
    id: number
    name: string,
    email: string
    role: validRole
};

interface User extends Request {
    user?: Payload
}

export const auth = (req: User, res: Response, next: NextFunction) => {
    const authHeaders = req.headers.authorization as string;
        if(!authHeaders) {
            return res.status(400).json({ error: "Token invalido, tente novamente!"});
        };

    const token = authHeaders.split(" ")[1];
    try {
        const decoded = Jwt.verify(token, process.env.JWT_SECRET as string) as Payload;
        req.user = decoded
        next();
    } catch (error) {
        console.error("Erro interno do servidor", error);
        return res.status(500).json({ error: "Erro interno do servidor"});
    }
}

export const isAdmin = (req: User, res: Response, next: NextFunction) => {
    
    if(!req.user) {
        return res.status(401).json({ error: "Não autorizado"});
    }

    if(req.user.role !== "ADMIN") {
        return res.status(403).json({ error: "Acesso negado!"});
    };

    next();
};