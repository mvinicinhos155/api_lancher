import { Sequelize } from "sequelize";
import "dotenv/config"

export const sequelize = new Sequelize(process.env.DATABASE as string, {
    dialect: "postgres",
    logging: false
})