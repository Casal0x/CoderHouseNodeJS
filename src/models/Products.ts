import { IProduct, IProductAuthRequest } from '../Interfaces/interfaces';
import { DB_PATH } from '../utils/constants';
import { getDbData, writeDbData } from '../utils/fileCheck';

class Products {
  id: number = 0;

  constructor() {
    this.getLastID();
  }

  async getLastID() {
    try {
      const data = await getDbData(DB_PATH);
      const lastProductId =
        data?.productos[data?.productos?.length - 1]?.id || 0;
      this.id = lastProductId ? lastProductId + 1 : lastProductId;
    } catch (error) {
      console.error('error ====>', error);
    }
  }

  async getProducts(): Promise<Array<IProduct> | null> {
    try {
      const data = await getDbData(DB_PATH);
      if (data) return data.productos;
      else return null;
    } catch (error) {
      return null;
    }
  }

  async addProduct(product: IProductAuthRequest) {
    try {
      product.id = this.id;
      product.admin = undefined;
      this.id++;
      const data = await getDbData(DB_PATH);
      if (data?.productos) data.productos.push(product);
      if (data) await writeDbData(DB_PATH, data);
      return product;
    } catch (error) {
      return null;
    }
  }

  async getProductById(id: number): Promise<IProduct | null> {
    try {
      const data = await getDbData(DB_PATH);
      const product = data?.productos.find((prod: IProduct) => prod.id === id);

      return product ? product : null;
    } catch (error) {
      return null;
    }
  }

  async updateProduct(
    id: number,
    prodToUpdate: IProduct
  ): Promise<IProduct | null> {
    try {
      const data = await getDbData(DB_PATH);
      if (data) {
        const products = data.productos;
        let product = products.find((prod: IProduct) => prod.id === id);
        if (!product) return null;
        const filteredProducts = products?.filter(
          (prod: IProduct) => prod.id !== id
        );
        product = { ...product, ...prodToUpdate };
        filteredProducts.push(product);
        filteredProducts.sort((a: IProduct, b: IProduct) => a.id - b.id);
        data.productos = filteredProducts;
        await writeDbData(DB_PATH, data);
        return product;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async removeProduct(id: number): Promise<IProduct | null> {
    try {
      const data = await getDbData(DB_PATH);
      if (data) {
        let product = data.productos.find((prod) => prod.id === id);
        const filteredProducts = data.productos.filter(
          (prod: IProduct) => prod.id !== id
        );
        data.productos = filteredProducts;
        await writeDbData(DB_PATH, data);
        return product ? product : null;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}

export default Products;
