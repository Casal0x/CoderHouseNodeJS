import knex, { Knex } from 'knex';
import dbConfig from '../../../knexfile';
import { IProducts, INewProduct } from '../../interfaces';

export class ProductDAOSQL {
  connection: Knex;

  constructor(mysql: boolean = true) {
    const options = mysql
      ? dbConfig['productsmysql']
      : dbConfig['productsqlite'];
    this.connection = knex(options);
  }

  async get(id?: string): Promise<IProducts[]> {
    if (id) return await this.connection('productos').where('id', id);
    return await this.connection('productos');
  }

  async add(body: INewProduct): Promise<IProducts> {
    const newProduct: IProducts = await this.connection('productos').insert(
      body
    );
    return newProduct;
  }

  async update(id: string, body: INewProduct): Promise<IProducts[]> {
    const item = await this.get(id);
    if (item.length) {
      await this.connection('productos').where('id', id).update(body);
      const updatedProduct = await this.get(id);
      return updatedProduct;
    }
    return item;
  }

  async delete(id: string): Promise<IProducts[]> {
    const item = await this.get(id);
    if (item.length) {
      const deletedElement: IProducts[] = [];
      await this.connection('productos').where('id', id).del();
      deletedElement.push(...item);
      return deletedElement;
    }
    return item;
  }
}
