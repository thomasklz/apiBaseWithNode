
import express from 'express';
import cors from "cors";
import { PORT } from './config/config.js';
import { sequelize } from "./db/conexion.js";

import { FrutasModel } from './models/FrutasModel.js';

const _PORT = PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

//app.use('/api', rotuerTypeUsers);


const main = async () => {
    try {
        await sequelize.authenticate();
        console.log('Base de datos conectada.');
        await sequelize.sync({ alter: false })
        app.listen(_PORT, () => {
            console.log(`Servidor corriendo en el puerto => ${_PORT}`);
        });
    } catch (error) {
        console.log(`Error ${error}`);
    }
}
main();

