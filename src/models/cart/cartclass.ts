import { promises as fs } from 'fs';
import path from 'path';
import { ICarts, IProducts } from '../interfaces';

const filePath = path.resolve(__dirname, './files/productslog.txt');
const filePathCart = path.resolve(__dirname, './files/cartlog.txt');

class Cart {
  content: Array<ICarts>;

  constructor() {
    this.content = [
      {
        id: this.randomId(),
        timestamp: Date.now(),
        products: [],
      },
    ];
  }

  randomId(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  async get(id?: string): Promise<Array<ICarts> | Array<IProducts>> {
    try {
      const txtFile: Array<ICarts> = JSON.parse(
        await fs.readFile(filePathCart, 'utf-8')
      );
      this.content = txtFile.length === 0 ? this.content : txtFile;
      const result: Array<ICarts> | Array<IProducts> = id
        ? this.content[0].products.filter((product) => product._id === id)
        : this.content;
      return result;
    } catch (error) {
      console.log(error);
      return this.content;
    }
  }

  async add(id: string): Promise<Array<IProducts>> {
    try {
      const txtFileC: Array<ICarts> = JSON.parse(
        await fs.readFile(filePathCart, 'utf-8')
      ); // Reads cart's file
      this.content = txtFileC.length === 0 ? this.content : txtFileC;
      const txtFile: Array<IProducts> = JSON.parse(
        await fs.readFile(filePath, 'utf-8')
      ); // Reads the products file
      const newProduct: Array<IProducts> = txtFile.filter(
        (product) => product._id === id
      );
      this.content[0].products.push(...newProduct);
      await fs.writeFile(filePathCart, JSON.stringify(this.content, null, 2));
      return newProduct.length === 0 ? [] : newProduct;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async delete(id: string): Promise<Array<IProducts> | -1> {
    try {
      this.content = JSON.parse(await fs.readFile(filePathCart, 'utf-8'));
      const arrayPosition: number = this.content[0].products
        .map((product) => product._id)
        .indexOf(id);
      const deletedProduct: Array<IProducts> = this.content[0].products.filter(
        (product) => product._id == id
      );
      arrayPosition !== -1 && this.content[0].products.splice(arrayPosition, 1);
      await fs.writeFile(filePathCart, JSON.stringify(this.content, null, 2));
      return arrayPosition !== -1 ? deletedProduct : arrayPosition;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
}

export const cart = new Cart();
