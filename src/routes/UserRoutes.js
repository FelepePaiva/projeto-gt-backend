import { Router } from "express";
import { createUser, getUserById, removeUserById, updateUserById } from "../controllers/UserController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import {validate} from "../middleware/validate.middleware.js";
import {userSchema} from "../validation/userSchema.validation.js"
import {idSchema} from "../validation/idSchema.validation.js"
import { userUpdateSchema } from "../validation/userUpdateSchema.validation.js";


const router = Router();

router.post('/user', validate(userSchema, 'body'), createUser);
router.get('/user/:id', validate(idSchema, 'params'), getUserById);
router.put('/user/:id', 
    authenticateToken,
    validate(idSchema, 'params'),
    validate(userUpdateSchema, 'body'),
    updateUserById);
router.delete('/user/:id', authenticateToken,validate(idSchema, 'params'), removeUserById);

export default router;