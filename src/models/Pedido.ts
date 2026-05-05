import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/database";
import { PedidoProduct } from "./Pedido_Produto";


type StatusP = "PENDENTE" | "PREPARANDO" | "SAIU_PARA_ENTREGA" | "ENTREGUE"

type PedidoAttribute = {
    id: number;
    user_id: number,
    status: StatusP
};



interface PedidoCreationAttributes extends Optional <PedidoAttribute, "id"> {}

export class Pedido extends Model<PedidoAttribute, PedidoCreationAttributes> {
    public id!: number;
    public produtos?: PedidoProduct[]
    public user_id!: number;
    public status!: StatusP
} 

Pedido.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("PENDENTE", "PREPARANDO", "SAIU_PARA_ENTREGA", "ENTREGUE"),
            defaultValue: "PENDENTE",
            allowNull: false
        }
    }, 
    { 
        sequelize,
        timestamps: true,
        tableName: "pedido"
    }
)