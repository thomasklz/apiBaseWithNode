import express from 'express';
import { login,updateUsersPassword, getOneUser, updateUsersEmail, getUsers,createUsers,updateUsers,deleteUsers} from '../controller/UserController.js';
import  {verifyToken}  from '../middleware/auth.js';
const rotuer = express.Router();
/**
 * @openapi
 * /api/user:
 *   get:
 *     summary: get all users
 *     tags:
 *       - users
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: OK
 */
rotuer.get('/user',verifyToken, getUsers);

/**
 * @openapi
 * /api/register:
 *   post:
 *     summary: create user
 *     tags:
 *      - users  
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user: 
 *                   type: string
 *                   description: Updated name of the pet
 *                email: 
 *                   type: string
 *                   description: Updated name of the pet
 *                password: 
 *                   type: string
 *                   description: Updated name of the pet
 *     responses:
 *      201:
 *        description: Create user
*      400:
 *        description: Missing required fields or invalid data             
 */
rotuer.post('/register', createUsers);
/**
 * @openapi
 * /api/user/{id}:
 *   get:
 *     summary: Get one user
 *     tags:
 *       - users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The identifier of the user
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               id: "45"
 *               name: "John Doe"
 *               email: "johndoe@espam.edu.ec"
 *               password: "123"
 *       "404":
 *         description: user not found
 */
rotuer.get('/user/:id',verifyToken, getOneUser);
rotuer.put('/user/:id', verifyToken, updateUsers);
rotuer.delete('/user/:id', verifyToken, deleteUsers);
/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: Login of user
 *     tags:
 *      - users  
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email: 
 *                   type: string
 *                   description: Input email
 *                password: 
 *                   type: string
 *                   description: Input password
 *     responses:
 *      200:
 *        description: Login successful
 *        content:
 *          application/json:
 *            example:
 *              message: "Login successful"
 *      400:
 *        description: Missing required fields or invalid data             
 */
rotuer.post('/login', login);
rotuer.put('/user/email/:id',verifyToken, updateUsersEmail);
rotuer.put('/user/password/:id',verifyToken, updateUsersPassword);
export const RouterUsuer = rotuer;