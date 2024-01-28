import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const TypeUsersModel = sequelize.define("typeusers",{
    id:{
        autoIncrement:true,
        primaryKey:true,
        type: DataTypes.INTEGER,
    },
    type:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
},
{
    timestamps:false
}
)
