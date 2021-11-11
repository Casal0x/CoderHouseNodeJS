import { Schema, model } from 'mongoose';
import { IOrder, OrderStatus } from '../interfaces/order.interface';

const cartSchema = new Schema<IOrder>({
  timestamp: {
    type: Number,
    default: Date.now(),
  },
  status: {
    type: String,
    default: OrderStatus.PendingPayment,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'product',
      },
      quantity: {
        type: Number,
      },
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

export default model('order', cartSchema);
