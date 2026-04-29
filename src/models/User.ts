import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/database";

type isAdmin = "ADMIN" | "USER";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role?: isAdmin;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id" | "role"> {}

export class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {

  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: isAdmin;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM("ADMIM", "USER"),
      defaultValue: "USER",
    },
  },
  {
    sequelize,
    modelName: "User",
    timestamps: true,
    tableName: "users"
  }
);