"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
class Product extends sequelize_1.Model {
}
exports.Product = Product;
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name_product: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    about: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    categoria: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    img: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: database_1.sequelize,
    modelName: "Product",
    timestamps: true,
    tableName: "product"
});
