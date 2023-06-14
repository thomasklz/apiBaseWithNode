import express from 'express';
import { getTypeUsers,createTypeUsers,updateTypeUsers,deleteTypeUsers} from '../controller/TypeUsersController.js';
import  {verifyToken}  from '../middleware/auth.js';
const rotuer = express.Router();

rotuer.get('/type/users', getTypeUsers);
rotuer.post('/type/users', createTypeUsers);
rotuer.put('/type/users/:id',verifyToken, updateTypeUsers);
rotuer.delete('/type/users/:id',  deleteTypeUsers);


export default rotuer;