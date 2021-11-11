import { Schema } from 'mongoose';

export interface ICartItem {
  product: Schema.Types.ObjectId;
  quantity: number;
}

export interface ICarts {
  _id: string;
  timestamp: number;
  products: Array<ICartItem>;
  owner: string | {};
}
