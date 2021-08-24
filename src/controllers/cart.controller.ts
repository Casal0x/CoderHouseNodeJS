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

cartCtrl.addProductByID = async (req: Request, res: Response) => {
  try {
    const { id_producto } = req.params;
    const parsedId = Number(id_producto);
    if (isNaN(parsedId)) {
      throw new Error('El ID debe ser un numero.');
    }

    const cart = await Cart.addProductToCartByIDs(0, parsedId);

    if (!cart) {
      throw new Error('Producto no encontrado.');
    }

    res.json(cart);
  } catch (error) {
    res.json({ error: error.message });
  }
};

cartCtrl.removeProductByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      throw new Error('El ID debe ser un numero.');
    }

    const cart = await Cart.deleteCartByID(parsedId);

    if (!cart) {
      throw new Error('Carrito no encontrado.');
    }

    res.json(cart);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export default cartCtrl;
