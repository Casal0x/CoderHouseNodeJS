// import 'regenerator-runtime/runtime';
import { Request, Response } from 'express';
import { IUser } from '../interfaces/user.interface';
import Cart from '../models/Cart';
import Products from '../models/Products';
import { logger } from '../utils/logger';

class CartController {
  async getCart(req: Request, res: Response) {
    try {
      const user = req.user as IUser;
      const cartOwnerID = user?._id.toString();
      if (cartOwnerID) {
        const cart = await Cart.findOne({ owner: cartOwnerID });
        if (cart) {
          res.json(cart);
        } else {
          res.status(500).json({ error: 'Carrito no existente.' });
        }
      } else {
        res.status(400).json({
          error: -1,
          msg: 'Necesitas estar conectador para ver tu carrito.',
        });
      }
    } catch (error) {
      logger.error(error);
      res.json({ error });
    }
  }

  async addCartProduct(req: Request, res: Response) {
    try {
      const user = req.user as IUser;
      const userID = user?._id.toString();
      const { id_producto } = req.params;

      if (userID && id_producto) {
        const cart = await Cart.findOne({ owner: userID });
        const productToAdd = await Products.findById(id_producto);
        if (!productToAdd)
          return res.status(404).json({ error: 'Producto no encontrado.' });

        if (cart) {
          const productExistInCart = cart.products.find(
            (product) =>
              product.product.toString() === productToAdd._id.toString()
          );
          if (productExistInCart) {
            const filterProduct = cart.products.filter(
              (product) =>
                product.product.toString() !== productToAdd._id.toString()
            );
            productExistInCart.quantity = productExistInCart.quantity + 1;
            filterProduct.push(productExistInCart);
            cart.products = filterProduct;
          } else {
            cart.products.push({
              product: productToAdd._id,
              quantity: 1,
            });
          }
          await cart.save();
          res.json(cart);
        } else {
          res.status(500).json({
            error: 'Carrito no existente, contactese con administrador.',
          });
        }
      } else {
        res.status(404).json({
          error: 'Necesitas estar conectador para agregar a tu carrito.',
        });
      }
    } catch (error) {
      logger.error(error);
      res.json({ error });
    }
  }

  async deleteCartProduct(req: Request, res: Response) {
    try {
      const user = req.user as IUser;
      const userID = user?._id.toString();
      const { id_producto } = req.params;

      if (userID) {
        const cart = await Cart.findOne({ owner: userID });

        const product = cart?.products.find(
          (product) => product.product.toString() === id_producto
        );
        if (product && cart) {
          const filteredProducts = cart.products.filter(
            (product) => product.product.toString() !== id_producto
          );
          product.quantity = product.quantity > 1 ? product.quantity - 1 : 0;
          if (product.quantity > 0) {
            filteredProducts?.push(product);
          }
          cart.products = filteredProducts;
          await cart?.save();
          return res.json({
            msg:
              product.quantity > 0
                ? 'Se redujo la cantidad del producto en 1.'
                : 'Producto eliminado del carrito.',
          });
        } else {
          return res
            .status(404)
            .json({ error: 'El producto no se encuentra en este carrito.' });
        }
      }
      res.status(403).json({ error: 'El usuario no esta conectado.' });
    } catch (error) {
      logger.error(error);
      res.json({ error });
    }
  }

  async getCartById(req: Request, res: Response) {
    const { id_carrito } = req.params;

    try {
      if (id_carrito) {
        const cart = await Cart.findById(id_carrito);
        return res.json(cart);
      }
      res.json({ error: 'Solo se pueden buscar carritos por id.' });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error });
    }
  }
}

export const cartController = new CartController();
