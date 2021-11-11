import { Router } from 'express';
import { orderController } from '../controllers/order.controller';
import { checkAdmin } from '../middlewares/isAdmin';

const router = Router();

router.get('/listar', orderController.getOrders);
// router.get('/listar/:id_carrito', checkAdmin, cartController.getCartById);
router.post('/crear', orderController.createOrder);
// router.delete('/borrar/:id_producto', cartController.deleteCartProduct);

export default router;
