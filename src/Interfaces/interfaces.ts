export interface IProduct {
  id: number;
  nombre: string;
  descripcion: number;
  codigo: string;
  foto: string;
  precio: number;
  stock: number;
}

export interface IProductCart extends IProduct {
  quantity?: number;
}

export interface IProductAuthRequest extends IProduct {
  admin?: boolean;
}

export interface ICart {
  id: number;
  timestamp: string;
  productos: Array<IProductCart>;
}

export interface IDBdata {
  productos: Array<IProduct>;
  carritos: Array<ICart>;
}
