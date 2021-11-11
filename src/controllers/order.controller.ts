// import 'regenerator-runtime/runtime';
import { Request, Response } from 'express';
import config from '../config';
import { IProducts } from '../interfaces/products.interface';
import { IUser } from '../interfaces/user.interface';
import Cart from '../models/Cart';
import Orders from '../models/Orders';
import { EmailService } from '../services/email';
import { MsgService } from '../services/twilio';
import { newOrderTemplate } from '../templates/createOrder.template';
import { logger } from '../utils/logger';

class OrderController {
  async getOrders(req: Request, res: Response) {
    const user = req.user as IUser;
    const UserId = user?._id;
    try {
      const orders = await Orders.find({ owner: UserId });
      res.json({ orders });
    } catch (error) {
      logger.error(error);
      res.json({ error: 'Ocurrio un error.' });
    }
  }

  async createOrder(req: Request, res: Response) {
    try {
      const user = req.user as IUser;
      const UserId = user?._id;

      const cart = await Cart.findOne({ owner: UserId });

      if (cart) {
        if (cart.products.length) {
          const newOrder = new Orders({
            products: cart.products,
            owner: UserId,
          });

          newOrder && (cart.products = []);

          await newOrder.save();
          await cart.save();
          await newOrder.populate('products.product');
          await newOrder.populate('owner');
          await EmailService.sendEmail(
            config.ADMIN_EMAIL,
            'Nueva Orden',
            newOrderTemplate(newOrder)
          );

          const products = newOrder.products.map((prod) => {
            const product = prod.product as IProducts;
            return `- ${product.title}, Cantidad: ${prod.quantity}`;
          });

          const user = newOrder.owner as IUser;
          await MsgService.sendWhatsapp(
            config.ADMIN_CEL,
            'Orden creada por ' + user.username + '\nProductos:\n' + products
          );

          return res.json({ order: newOrder });
        } else {
          return res.json({
            error: 'El carrito debe tener al menos 1 producto.',
          });
        }
      }
      res.json({ error: 'Ocurrio un error.' });
    } catch (error) {
      logger.error(error);
      res.json({ error: 'Ocurrio un error' });
    }
  }

  async editOrder(req: Request, res: Response) {}

  async cancelOrder(req: Request, res: Response) {
    try {
      const { orderId } = req.body;
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteOrder(req: Request, res: Response) {}

  async getOrderByID(req: Request, res: Response) {}
}

export const orderController = new OrderController();
