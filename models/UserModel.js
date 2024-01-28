import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { TypeUsersModel } from "./TypeUsersModel.js";

export const UserModel = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
  },
  {
    timestamps: false,
  }
);

TypeUsersModel.hasMany(UserModel, { foreignKey: "typeusers_id" });
UserModel.belongsTo(TypeUsersModel, { foreignKey: "typeusers_id" });
