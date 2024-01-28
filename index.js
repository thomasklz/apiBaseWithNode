
import express from 'express';
import cors from "cors";
import { PORT } from './config/config.js';
import rotuerTypeUsers from './router/TypeUsersRouter.js';
import  { RouterUsuer } from './router/UserRouter.js';
import { sequelize } from "./db/conexion.js";

const _PORT = PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', rotuerTypeUsers);
app.use('/api', RouterUsuer);

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

