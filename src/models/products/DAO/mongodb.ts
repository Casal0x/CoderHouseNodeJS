import { Schema, model, connect } from 'mongoose';
import { IProducts, INewProduct, IProductQuery } from '../../interfaces';

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

export class ProductDAOMONGO {
  private uri: any;
  private products;

  constructor(local: boolean = true) {
    if (local) this.uri = process.env.MONGO_LOCAL;
    else this.uri = process.env.MONGO_ATLAS;
    connect(this.uri);
    this.products = model<IProducts>('productos', productsSchema);
  }

  async get(id?: string): Promise<IProducts[]> {
    let outputGet: IProducts[] = [];

    if (id) {
      const singleProduct = await this.products.findById(id);
      singleProduct && outputGet.push(singleProduct);
    } else {
      outputGet = await this.products.find();
    }
    return outputGet;
  }

  async add(data: INewProduct): Promise<IProducts> {
    const newProduct = new this.products(data);
    await newProduct.save();
    return newProduct;
  }

  async update(id: string, data: INewProduct): Promise<IProducts[]> {
    let outputUpdate: IProducts[] = [];
    await this.products.findByIdAndUpdate(
      id,
      { $set: data },
      { runValidators: true }
    );

    const updatedProduct = await this.products.findById(id);
    updatedProduct && outputUpdate.push(updatedProduct);

    return outputUpdate;
  }

  async delete(id: string): Promise<IProducts[]> {
    let outputDelete: IProducts[] = [];
    const deletedProduct = await this.products.findByIdAndDelete(id);
    deletedProduct && outputDelete.push(deletedProduct);
    return outputDelete;
  }
}
