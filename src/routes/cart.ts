import { Router } from 'express';
import CartController from '../controllers/cart.controller';

const router = Router();

router.get('/listar', CartController.getCarts);

router.get('/listar/:id', CartController.getCartByID);

router.put('/agregar/:id_producto', CartController.addProductByID);

router.put(
  '/agregar',
  CartController.addProductByIDAndCartID
);

router.delete('/borrar/:id', CartController.removeProductByID);

export default router;
