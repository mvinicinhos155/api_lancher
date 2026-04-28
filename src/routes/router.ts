import { Router } from "express";
import Controller_User from "../controllers/Controller_User";
import Controller_Product from "../controllers/Controller_Product";
import Contoller_Pedido from "../controllers/Controller_Pedido";
import Controller_Pedido_Product from "../controllers/Controller_Pedido_Product";
import { auth, isAdmin } from "../middlewares/auth";
import { Pagamento } from "../controllers/Controller_Pagamento";
import upload from "../middlewares/upload";

const routes = Router();

routes.post("/user", Controller_User.CreateUser);
routes.post("/login", Controller_User.Login);
routes.get("/users", auth, isAdmin, Controller_User.GetAllUsers);
routes.put("/upUser/:id", auth, isAdmin, Controller_User.UpdateUser);
routes.delete("/delUser/:id", auth, Controller_User.DeleteUser);

routes.post("/product", auth, isAdmin, upload.single("img"), Controller_Product.createProduct);
routes.get("/products", Controller_Product.getAllProducts);
routes.delete("/delProduct/:id", auth, isAdmin, Controller_Product.deleteProduto);
routes.put("/upProduct/:id", Controller_Product.editProduto);

routes.post("/pedido", auth, Contoller_Pedido.createPedido);
routes.get("/pedidos", auth, Contoller_Pedido.getAllPedido);
routes.get("/user_pedido", auth, Contoller_Pedido.getAllUserPedidos);
routes.delete("/dell_pedido", auth, Contoller_Pedido.dellPedido);

routes.post("/pedido_produto", auth, Controller_Pedido_Product.createPedidoProduto);
routes.get("/user_pedido_product", auth, Controller_Pedido_Product.getAllPedidoProdutoUser);
routes.get("/users_pedidos", auth, isAdmin, Controller_Pedido_Product.getAllPedidoProdutoUsers);

const pagamento = new Pagamento();

routes.get("/pix", auth, (req, res) => pagamento.handle(req, res));


export default routes;