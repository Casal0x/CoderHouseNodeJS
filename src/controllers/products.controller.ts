import { Request, Response } from 'express';
import Products from '../models/Products';

const prodCtrl: any = {};
const PRODUCTS = new Products();

prodCtrl.getProducts = async (req: Request, res: Response) => {
  try {
    const products = await PRODUCTS.getProducts();
    if (products && products.length === 0) {
      throw new Error('no hay productos cargados');
    }

    res.json(products);
  } catch (error) {
    res.json({ error: error.message });
  }
};

prodCtrl.getProductById = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;
  const parsedId = Number(id);
  try {
    if (isNaN(parsedId)) {
      throw new Error('El ID debe ser un numero.');
    }
    const product = await PRODUCTS.getProductById(parsedId);
    if (!product) {
      throw new Error('producto no encontrado');
    }

    res.json(product);
  } catch (error) {
    res.json({ error: error.message });
  }
};

prodCtrl.addProduct = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const product = await PRODUCTS.addProduct(body);

    if (!product) {
      throw new Error('producto no encontrado');
    }

    res.json(product);
  } catch (error) {
    res.json({ error: error.message });
  }
};

prodCtrl.updateProductById = async (req: Request, res: Response) => {
  const {
    params: { id },
    body,
  } = req;
  const parsedId = Number(id);
  try {
    if (isNaN(parsedId)) {
      throw new Error('El ID debe ser un numero.');
    }
    const updatedProduct = await PRODUCTS.updateProduct(parsedId, body);
    if (!updatedProduct) {
      throw new Error('producto no encontrado');
    }

    res.json(updatedProduct);
  } catch (error) {
    res.json({ error: error.message });
  }
};

prodCtrl.removeProductById = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;
  const parsedId = Number(id);
  try {
    if (isNaN(parsedId)) {
      throw new Error('El ID debe ser un numero.');
    }
    const removedProduct = await PRODUCTS.removeProduct(parsedId);
    if (!removedProduct) {
      throw new Error('producto no encontrado');
    }

    res.json(removedProduct);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export default prodCtrl;
