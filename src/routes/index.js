import { Router } from 'express';
import ProductRoutes from './products';

const router = Router();

router.use('/productos', ProductRoutes);

export default router;
