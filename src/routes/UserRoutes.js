import { Router } from "express";
import { addUser, getUserById, removeUserById, updateUserById } from "../controllers/UserController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

router.post('/user', addUser);
router.get('/user/:id', getUserById);
router.put('/user/:id', authenticateToken, updateUserById);
router.delete('/user/:id', authenticateToken, removeUserById);

export default router;