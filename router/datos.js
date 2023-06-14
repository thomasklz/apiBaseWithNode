import express from 'express';
import { obtenerDatos,crearDatos,editarDatos,eliminarDatos} from '../controller/datos.js';

const rotuer = express.Router();

rotuer.get('/datos/obtener', obtenerDatos);
rotuer.post('/datos/create', crearDatos);
rotuer.put('/datos/update/:id', editarDatos);
rotuer.delete('/datos/delete/:id', eliminarDatos);


export default rotuer;