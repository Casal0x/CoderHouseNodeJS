import { IProducts } from 'interfaces/products.interface';
import ProductModel from 'models/Products';
import ProductsDTO from './products.dto';
import { Types } from 'mongoose';

const ObjectId = Types.ObjectId;

class ProductDao {
  productos: typeof ProductModel;

  constructor() {
    this.productos = ProductModel;
  }

  async get(id?: string): Promise<ProductsDTO[]> {
    let output: IProducts[] = [];

    if (id) {
      if (ObjectId.isValid(id)) {
        const document: IProducts | null = await this.productos.findById(id);
        if (document) output.push(document);
      }
    } else {
      output = await this.productos.find();
    }

    return output.map((aProduct) => new ProductsDTO(aProduct));
  }

  async add(data: IProducts): Promise<ProductsDTO> {
    const newProduct = new this.productos(data);
    await newProduct.save();

    return new ProductsDTO(newProduct);
  }

  async update(
    id: string,
    newProductData: IProducts
  ): Promise<ProductsDTO | null> {
    const result: IProducts | null = await this.productos.findByIdAndUpdate(
      id,
      newProductData,
      {
        new: true,
      }
    );
    if (result) return new ProductsDTO(result);
    return null;
  }

  async delete(id: string) {
    await this.productos.findByIdAndDelete(id);
  }
}

export default ProductDao;
