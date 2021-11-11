import { Schema, model } from 'mongoose';
import { IProducts } from '../interfaces/products.interface';

const productsSchema = new Schema<IProducts>(
  {
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 300 },
    code: { type: String || Number, required: true },
    price: {
      type: Number,
      required: true,
      min: [100, `El valor es {VALUE}, debe ser como minimo 100`],
      max: [5000, `El valor es {VALUE}, debe ser como maximo 5000`],
    },
    thumbnail: { type: String, required: true, max: 100 },
    stock: { type: Number, required: true },
  },
  { versionKey: false }
);

export default model('product', productsSchema);
