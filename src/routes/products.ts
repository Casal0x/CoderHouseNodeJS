import { Router } from 'express';
import ProductController from '../controllers/products.controller';
import { isAdmin } from '../middlewares/checkIfAdmin';

const router = Router();

router.get('/listar', ProductController.getProducts);

router.get('/listar/:id', ProductController.getProductById);

router.post('/guardar', isAdmin, ProductController.addProduct);

router.put('/actualizar/:id', isAdmin, ProductController.updateProductById);

router.delete('/borrar/:id', isAdmin, ProductController.removeProductById);

export default router;
