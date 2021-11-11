import { Router } from 'express';
import productsRouter from './products';
import cartRouter from './cart';
import orderRouter from './order';
import authRouter from './auth';
import filesRouter from './files';
import { EmailService } from '../services/email';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    pid: process.pid,
  });
});

router.use('/files', filesRouter);
router.use('/productos', productsRouter);
router.use('/carrito', cartRouter);
router.use('/orders', orderRouter);
router.use('/auth', authRouter);

export default router;
