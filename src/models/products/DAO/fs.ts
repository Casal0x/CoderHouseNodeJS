import { promises as fs } from 'fs';
import path from 'path';
import { IProducts, INewProduct, IProductQuery } from '../../interfaces';

const filePath = path.resolve(__dirname, '../../files/productslog.txt');

export class ProductDAOFS {
  private content: Array<IProducts>;

  constructor() {
    this.content = [];
  }

  randomId(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  async get(id?: string): Promise<IProducts[]> {
    try {
      const txtFile: Array<IProducts> = JSON.parse(
        await fs.readFile(filePath, 'utf-8')
      );
      this.content = txtFile;
      return id
        ? this.content.filter((product) => product._id === id)
        : this.content;
    } catch (error) {
      console.log(error);
      return this.content;
    }
  }

  async add(data: INewProduct): Promise<IProducts> {
    this.content = JSON.parse(await fs.readFile(filePath, 'utf-8'));
    const newProduct: IProducts = {
      _id: this.randomId(),
      ...data,
    };
    this.content.push(newProduct);
    await fs.writeFile(filePath, JSON.stringify(this.content, null, 2));
    return newProduct;
  }

  async update(id: string, data: INewProduct): Promise<IProducts[]> {
    const getProducts: Array<IProducts> = await this.get();
    const arrayPosition: number = getProducts
      .map((product) => product._id)
      .indexOf(id);
    arrayPosition !== -1 &&
      `${(this.content[arrayPosition].title = data.title)}
				${(this.content[arrayPosition].description = data.description)}
				${(this.content[arrayPosition].code = data.code)}
				${(this.content[arrayPosition].price = data.price)}
				${(this.content[arrayPosition].thumbnail = data.thumbnail)}
				${(this.content[arrayPosition].stock = data.stock)}`;
    await fs.writeFile(filePath, JSON.stringify(this.content, null, 2));
    return arrayPosition !== -1 ? [this.content[arrayPosition]] : [];
  }

  async delete(id: string): Promise<IProducts[]> {
    const getProducts: Array<IProducts> = await this.get();
    const arrayPosition: number = getProducts
      .map((product) => product._id)
      .indexOf(id);
    const deletedProduct: Array<IProducts> = this.content.filter(
      (product) => product._id == id
    );
    arrayPosition !== -1 && this.content.splice(arrayPosition, 1);
    await fs.writeFile(filePath, JSON.stringify(this.content, null, 2));
    return arrayPosition !== -1 ? deletedProduct : [];
  }

  async query(options: IProductQuery): Promise<IProducts[]> {
    await this.get();
    type Conditions = (aProduct: IProducts) => boolean;
    const query: Conditions[] = [];

    if (options.title)
      query.push((aProduct: IProducts) => aProduct.title == options.title);

    if (options.price)
      query.push((aProduct: IProducts) => aProduct.price == options.price);

    if (options.code)
      query.push((aProduct: IProducts) => aProduct.code == options.code);

    if (options.stock)
      query.push((aProduct: IProducts) => aProduct.stock == options.stock);

    return this.content.filter((aProduct) => query.every((x) => x(aProduct)));
  }
}
