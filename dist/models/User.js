"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM("ADMIM", "USER"),
        defaultValue: "USER",
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "User",
    timestamps: true,
    tableName: "user"
});
