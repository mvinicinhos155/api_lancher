import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/database";

interface ProductAttributes {
    id: number
    name_product: string
    price: number
    about: string
    categoria: string
    img: string
}

interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}

export class Product extends Model<ProductAttributes, ProductCreationAttributes> {
    public id!: number;
    public name_product!: string;
    public price!: number
    public about!: string
    public categoria!: string
    public img!: string
}

Product.init(
    {
       id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
            
       },
       name_product: {
            type: DataTypes.STRING,
            allowNull: true
       },   
       price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true, 
       }, 
       about: {
            type: DataTypes.STRING,
            allowNull: true
       }, 
       categoria: {
            type: DataTypes.STRING,
            allowNull: true
       },
       img: {
          type: DataTypes.STRING,
          allowNull: true
       }
    },
    { 
        sequelize,
        modelName: "Product",
        timestamps: true,
        tableName: "product"
     }
)