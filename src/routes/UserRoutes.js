import { Router } from "express";
import { addUser, getUserById, removeUserById, updateUserById } from "../controllers/UserController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();
/**
 * @swagger
 * /v1/user:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - surname
 *               - email
 *               - password
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: João
 *               surname:
 *                 type: string
 *                 example: Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos ou ausentes
 */
router.post('/user', addUser);
router.get('/user/:id', getUserById);
router.put('/user/:id', authenticateToken, updateUserById);
router.delete('/user/:id', authenticateToken, removeUserById);

export default router;