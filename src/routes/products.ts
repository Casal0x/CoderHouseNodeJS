import { Router } from 'express';
import { productController } from '../controllers/products.controller';
import { checkAdmin } from '../middlewares/isAdmin';

const router = Router();

router.get('/listar/:id?', productController.getProducts);
router.post('/agregar', checkAdmin, productController.addProducts);
router.put('/actualizar/:id', checkAdmin, productController.updateProducts);
router.delete('/borrar/:id', checkAdmin, productController.deleteProducts);

export default router;
