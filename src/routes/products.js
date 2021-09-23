import { Router } from 'express';
import ProductController from '../controllers/products.controller';

const router = Router();

router.get('/listar', ProductController.getProducts);

router.get('/vista-test', ProductController.getProductsFaker);

router.get('/listar/:id', ProductController.getProductById);

router.post('/guardar', ProductController.addProduct);

router.put('/actualizar/:id', ProductController.updateProductById);

router.delete('/borrar/:id', ProductController.removeProductById);

export default router;
