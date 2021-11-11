import { Schema } from 'mongoose';
import { IProducts } from './products.interface';
import { IUser } from './user.interface';

export interface IOrderItem {
  product: Schema.Types.ObjectId | IProducts;
  quantity: number;
}

export enum OrderStatus {
  PendingPayment = 'Pago-Pendiente',
  ConfirmedPayment = 'Pago-Confirmado',
  PendingShipment = 'Envio-Pendiente',
  ConfirmedShipment = 'Envio-Confirmado',
  CanceledOrder = 'Orden-Cancelada',
}

export interface IOrder {
  _id: string;
  timestamp: number;
  status: OrderStatus;
  products: Array<IOrderItem>;
  owner: Schema.Types.ObjectId | string | IUser;
}
