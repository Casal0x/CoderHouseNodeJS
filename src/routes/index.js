import { Router } from 'express';
import prodCtrl from '../controllers/products.controller';
import ProductRoutes from './products';

const router = Router();

router.use('/api/productos', ProductRoutes);


// Web Routes
router.get('/productos/vista', prodCtrl.getView);
router.get('/productos/guardar', prodCtrl.addProductView);

export default router;
