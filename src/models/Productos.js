import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  id: {
    type: Number,
  },
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  codigo: {
    type: String,
    required: true,
  },
  foto: String,
  precio: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
});

export default model('product', productSchema);
