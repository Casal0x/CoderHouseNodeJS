import { FactoryDAO } from '../models/products/productfactory';
import { IProducts, INewProduct, IProductQuery } from '../models/interfaces';

const type = 6;

class prodAPI {
  private products;

  constructor() {
    this.products = FactoryDAO.get(type);
  }

  async getProducts(id?: string): Promise<IProducts[]> {
    if (id) return await this.products.get(id);
    return await this.products.get();
  }

  async addProduct(
    productData: INewProduct
  ): Promise<IProducts | FirebaseFirestore.WriteResult> {
    const newProduct = await this.products.add(productData);
    return newProduct;
  }

  async updateProduct(
    id: string,
    productData: INewProduct
  ): Promise<IProducts[]> {
    const updatedProduct = await this.products.update(id, productData);
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<IProducts[]> {
    return await this.products.delete(id);
  }
}

export const productsAPI = new prodAPI();
