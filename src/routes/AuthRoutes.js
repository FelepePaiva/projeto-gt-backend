import { Router } from 'express';
import { loginUser } from '../controllers/AuthController.js';

const router = Router();

router.post('/user/token', loginUser);

export default router;
