import { Router } from "express";
import { createCategory, getAllCategories, getCategoryById, removeCategoryById, updateCategoryById } from "../controllers/CategoryController.js";
import {authenticateToken} from "../middleware/authMiddleware.js"

const router = Router();

router.get('/category/search', getAllCategories);
router.get('/category/:id', getCategoryById);
router.post('/category', authenticateToken, createCategory);
router.put('/category/:id', authenticateToken, updateCategoryById);
router.delete('/category/:id', authenticateToken, removeCategoryById);
export default router;