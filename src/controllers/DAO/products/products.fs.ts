import { Request, Response } from 'express';
import fs from 'fs/promises';
import { INewProduct } from 'interfaces/products.interface';
import Config from '../../../config';
import { v4 as uuidv4 } from 'uuid';

const DBPATH = Config.DB_PATH;

class ProductControllerFS {
  private fileData: any;
  constructor() {
    this.readFile();
  }

  async readFile() {
    let data = await fs.readFile(DBPATH, 'utf-8');
    data = JSON.parse(data);

    this.fileData = data;
  }

  async getProducts(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (id) {
        const singleProduct = this.fileData?.products?.find(
          (prod: any) => prod?._id === id
        );
        if (!singleProduct) {
          return res
            .status(404)
            .json({ error: 'No existe un producto con este id' });
        }
        return res.json({ product: singleProduct });
      } else {
        const get = this.fileData.products;
        if (get.length === 0) {
          return res.status(404).json({ error: 'No hay productos cargados' });
        }
        return res.json({ products: get });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async addProducts(req: Request, res: Response) {
    try {
      const body = req.body;
      if (body) {
        const newProduct: INewProduct = { ...body, _id: uuidv4() };
        this.fileData.products.push(newProduct);
        await fs.writeFile(DBPATH, JSON.stringify(this.fileData));
        return res.json({ product: newProduct });
      }
      return res.status(404).json({
        error:
          'Se debe enviar un body con title, description, code, price, thumbnail, stock',
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async updateProducts(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const body = req.body;
      let itemToUpdate = this.fileData.products.find(
        (prod: any) => prod._id === id
      );
      if (!itemToUpdate)
        return res.status(404).json({ error: 'Producto no encontrado' });
      itemToUpdate = { ...itemToUpdate, ...body };
      const filteredProds = await this.fileData.products.filter(
        (prod: any) => prod._id !== id
      );
      this.fileData.products = [...itemToUpdate, ...filteredProds];
      await fs.writeFile(DBPATH, JSON.parse(this.fileData));

      res.status(201).json({ product: itemToUpdate });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async deleteProducts(req: Request, res: Response) {
    try {
      const { id } = req.params;
      let itemToDelete = this.fileData.products.find(
        (prod: any) => prod._id === id
      );
      if (!itemToDelete)
        return res
          .status(404)
          .json({ error: 'Producto no encontrado o ya eliminado' });

      const filteredProds = await this.fileData.products.filter(
        (prod: any) => prod._id !== id
      );

      this.fileData.products = filteredProds;
      await fs.writeFile(DBPATH, JSON.parse(this.fileData));
      res.json({ itemToDelete });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
}

export const productControllerFS = new ProductControllerFS();
