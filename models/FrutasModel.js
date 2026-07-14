import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const FrutasModel = sequelize.define("frutas",{
    id:{
        autoIncrement:true,
        primaryKey:true,
        type: DataTypes.INTEGER,
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    color: {
        type: DataTypes.STRING,
        defaultValue: true,
      },
     estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },     
},
{
    timestamps:false
}
)
