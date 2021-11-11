export interface IProducts {
  _id: string;
  title?: string;
  description?: string;
  code?: string;
  price?: number;
  thumbnail?: string;
  stock?: number;
}

export interface INewProduct {
  title: string;
  description: string;
  code: string;
  price: number;
  thumbnail: string;
  stock: number;
}

export interface IProductQuery {
  title?: string;
  price?: number;
  code?: string | number;
  stock?: number;
}
