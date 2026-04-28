import { Request, Response } from "express";
import { User } from "../models/User";
import { Payload } from "../middlewares/auth";
import bcrypt  from "bcrypt";
import jwt from "jsonwebtoken";


interface AuthRequest extends Request {
  user?: Payload;
}


type BodyUser = {
    name: string
    email: string
    password: string
}


class ControllerUser {
    async CreateUser(req: Request, res: Response): Promise<Response> {
        try {
            const { name,  email, password } = req.body as BodyUser;
            const validPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
                if(!validPassword.test(password)) {
                    return res.status(400).json({ error: "Senha deve conter letra maiúscula, número e 8 caracteres"});
                };

            const hashPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                email,
                password: hashPassword
            });

            user.password = "";

            return res.status(200).json({ message: "Usúario criado com sucesso!", user});
        } catch(error) {
            console.error("Erro interno do servidor", error);
            return res.status(500).json({ error: "Erro interno do servidor"});
        };
    };

    async Login(req: Request, res: Response): Promise<Response> {
        try {

            const { email, password } = req.body as BodyUser;
            const validUser = await User.findOne({
                where: { email },
            });

                if(!validUser) {
                    return res.status(400).json({ error: "Email digitado errado ou não existe!"});
                };

            const validPassword = await bcrypt.compare(password, (validUser as any).password);
                if(!validPassword) {
                    return res.status(400).json({ error: "Senha incorreta"});
                }

            const token = jwt.sign({id: validUser.id, name: validUser.name, email: validUser.email, role: validUser.role},  process.env.JWT_SECRET as string, { expiresIn: "1h"});

            validUser.password = "";
        
            return res.status(200).json({ message: "Login feito  com sucesso", validUser, token});
        } catch(error) {
            console.error("Erro interno  do servidor", error);
            return res.status(500).json({ error: "erro interno do servidor"});
        }
    };

    async GetAllUsers(req: Request, res: Response): Promise<Response> {
        try {
            const users = await User.findAll();
                if(!users) {
                    return res.status(404).json({ error: "Erro ao buscar usuários"});
                };
            return res.status(201).json({ message: "Usúarios listado com sucesso!!", users});
        } catch(error) {
            console.error("Erro interno do servidor", error);
            return res.status(500).json({ error: "Erro interno do servidor"});
        }
    }

   async DeleteUser(req: AuthRequest, res: Response): Promise<Response> {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Token inválido" });
        }

        const userIdFromToken = req.user.id;
        const userIdFromParams = Number(req.params.id);

        if (userIdFromToken !== userIdFromParams) {
            return res.status(403).json({ error: "Não tem permissão para excluir" });
        }

        const user = await User.findOne({
            where: { id: userIdFromParams }
        });

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        await User.destroy({
            where: { id: userIdFromParams }
        });

        return res.status(200).json({
            message: "Usuário deletado com sucesso",
            user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
    }

    async UpdateUser(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const update = await User.update(
                {role: "ADMIN"},
                {
                    where: { id: id }
                }
            );

                if(!update) {
                    return res.status(400).json({ error: "Erro ao atualizar o usuário"});
                }

            return res.status(200).json({ message: "Usúario atualizido com sucesso"});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}


export default new ControllerUser;