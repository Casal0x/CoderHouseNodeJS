import { Request, Response } from 'express';
import CartModel from '../models/Cart';

const cartCtrl: any = {};
const Cart = new CartModel();

cartCtrl.getCarts = async (req: Request, res: Response) => {
  try {
    const carts = await Cart.getCarts();

    if (!carts) {
      throw new Error('No existen carritos actualmente!.');
    }

    res.json(carts);
  } catch (error) {
    res.json({ error: error.message });
  }
};

cartCtrl.getCartByID = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new Error('El ID debe ser un numero.');
    }

    const carts = await Cart.getCartByID(id);

    if (!carts) {
      throw new Error('No se encontro el carrito solicitado!.');
    }

    res.json(carts);
  } catch (error) {
    res.json({ error: error.message });
  }
};

cartCtrl.addProductByID = async (req: Request, res: Response) => {};

cartCtrl.addProductByIDAndCartID = async (req: Request, res: Response) => {};

cartCtrl.removeProductByID = async (req: Request, res: Response) => {};

export default cartCtrl;
