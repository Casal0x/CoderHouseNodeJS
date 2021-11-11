import { Schema, model } from 'mongoose';
import { ICarts } from '../interfaces/cart.interface';

const cartSchema = new Schema<ICarts>({
  timestamp: {
    type: Number,
    default: Date.now(),
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'product',
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    unique: true,
  },
});

export default model('cart', cartSchema);
