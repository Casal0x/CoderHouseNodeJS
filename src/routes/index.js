import { Router } from 'express';
import prodCtrl from '../controllers/products.controller';
import authCtrl from '../controllers/auth.controller';
import ProductRoutes from './products';
import AuthRoutes from './auth';

const router = Router();

router.use('/api/productos', ProductRoutes);
router.use('/api/auth', AuthRoutes);

// Web Routes
router.get('/productos/vista', prodCtrl.getView);
router.get('/productos/guardar', prodCtrl.addProductView);
router.get('/productos/guardarWs', prodCtrl.addProductViewWs);
router.get('/login', authCtrl.loginView);
router.get('/logout', authCtrl.logoutView);

router.get('/chat', (req, res) => {
  res.render('chat');
});

export default router;
