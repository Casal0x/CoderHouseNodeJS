import { IProducts } from 'interfaces/products.interface';

export default class ProductsDTO {
  _id: string;
  title: string;
  description: string;
  code: string;
  price: number;
  thumbnail: string;
  stock: number;

  constructor(data: IProducts) {
    this.title = data.title || '';
    this.description = data.description || '';
    this.code = data.code || '';
    this.price = data.price || 0;
    this.stock = data.stock || 0;
    this.thumbnail = data.thumbnail || '';
    this._id = data._id || '';
  }
}
