import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const DatosModel = sequelize.define("datos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cedula: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
},
{
  timestamps: false
}

);

