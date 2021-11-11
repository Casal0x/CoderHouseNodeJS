import { Router } from 'express';
import { cartController } from '../controllers/cart.controller';
import { checkAdmin } from '../middlewares/isAdmin';

const router = Router();

router.get('/listar', cartController.getCart);
router.get('/listar/:id_carrito', checkAdmin, cartController.getCartById);
router.put('/agregar/:id_producto', cartController.addCartProduct);
router.delete('/borrar/:id_producto', cartController.deleteCartProduct);

export default router;
