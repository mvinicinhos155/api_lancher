import { DataType, DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/database";

type PedidoProdutoAttribute = {
    id: number;
    pedido_id: number;
    product_id: number;
    quantidade: number;
    price: number;
}

interface PedidoProductCreationAttributes extends Optional<PedidoProdutoAttribute, "id"> {};

export class PedidoProduct extends Model<PedidoProdutoAttribute, PedidoProductCreationAttributes> {
    public id!: number
    public pedido_id!: number
    public product!: number
    public quantidade!: number
    public price!: number
}

PedidoProduct.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        pedido_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }, 
        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: true,
        tableName: "pedido_product"
    }
)