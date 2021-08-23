import { Router, Request, Response } from 'express';
import ProductRoutes from './products';
import CartRoutes from './cart';

const router = Router();

router.use('/api/productos', ProductRoutes);
router.use('/api/carrito', CartRoutes);

router.use('*', (req: Request, res: Response) =>
  res.status(404).json({ notFound: 'Error 404, ruta no encontrada.' })
);

export default router;
