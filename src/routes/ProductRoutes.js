import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { createProduct, getAllProducts, getProductById, removeProductById } from "../controllers/ProductController.js";

const router = Router();

router.post('/product', authenticateToken, createProduct);
router.get('/product/search', getAllProducts);
router.get('/product/:id', getProductById);
router.delete('/product/:id', authenticateToken, removeProductById);
export default router;