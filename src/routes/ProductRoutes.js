import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { createProduct, getAllProducts, getProductById } from "../controllers/ProductController.js";

const router = Router();

router.post('/product', authenticateToken, createProduct);
router.get('/product/search', getAllProducts);
router.get('/product/:id', getProductById);
export default router;