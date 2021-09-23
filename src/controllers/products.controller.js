import faker from 'faker';
import Products from '../models/Productos';

const prodCtrl = {};

prodCtrl.getProducts = async (req, res) => {
  try {
    const products = await Products.find();

    if (products.length === 0) {
      throw new Error('no hay productos cargados');
    }

    res.json({ products });
  } catch (error) {
    res.json({ error: error.message });
  }
};

prodCtrl.getProductsFaker = (req, res) => {
  const { cant } = req.query;
  const products = [];
  const quantity = Number(cant) || 0;

  const fakerProducts = {
    title: faker.commerce.productName(),
    price: Number(faker.commerce.price()),
    thumbnail: faker.image.technics(),
  };

  if (typeof quantity === 'number') {
    if (quantity === 0) {
      return res.status(404).json({ message: 'No hay productos.' });
    } else {
      for (let i = 0; i < quantity; i++) {
        products.push(fakerProducts);
      }
      return res.json({ products });
    }
  }

  for (let i = 0; i < 10; i++) {
    products.push(fakerProducts);
  }
  return res.json({ products });
};

prodCtrl.getProductById = async (req, res) => {
  const {
    params: { id },
  } = req;
  const parsedId = Number(id);
  try {
    if (typeof parsedId !== 'number') {
      throw new Error('El ID debe ser un numero.');
    }
    const product = await Products.find({ id: parsedId });
    if (!product) {
      throw new Error('producto no encontrado');
    }
    res.json({ product });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};

prodCtrl.addProduct = async (req, res) => {
  const { body } = req;
  try {
    const isWeb = body.web === 'true' ? true : false;
    const WS = body.ws || false;

    delete body.web;
    delete body.ws;
    delete body.admin;

    const products = await Products.find();
    const newId =
      products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const product = new Products({
      id: newId,
      ...body,
    });

    await product.save();

    if (!product) {
      throw new Error('Error al guardar el producto');
    }

    if (isWeb) {
      res.render('addProduct');
    } else {
      if (WS) {
        const products = await Products.find();
        req.io.emit('products', products);
      }
      res.json(product);
    }
    res.json({ product });
  } catch (error) {
    res.json({ error: error.message });
  }
};

prodCtrl.updateProductById = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;
  const parsedId = Number(id);
  try {
    if (typeof parsedId !== 'number') {
      throw new Error('El ID debe ser un numero.');
    }
    const updatedProduct = await Products.findOneAndUpdate(
      { id: parsedId },
      body,
      { new: true }
    );
    if (!updatedProduct) {
      throw new Error('producto no encontrado');
    }

    res.json({ updatedProduct });
  } catch (error) {
    res.json({ error: error.message });
  }
};

prodCtrl.removeProductById = async (req, res) => {
  const {
    params: { id },
  } = req;
  const parsedId = Number(id);
  try {
    if (typeof parsedId !== 'number') {
      throw new Error('El ID debe ser un numero.');
    }
    const updatedProduct = await Products.findOneAndDelete({ id: parsedId });
    if (!updatedProduct) {
      throw new Error('producto no encontrado');
    }

    res.json(updatedProduct);
  } catch (error) {
    res.json({ error: error.message });
  }
};

prodCtrl.getView = async (req, res) => {
  try {
    const products = await Products.find();

    res.render('products', { products });
  } catch (error) {
    res.render('products', { products: [] });
  }
};

prodCtrl.addProductView = (req, res) => {
  res.render('addProduct');
};

prodCtrl.addProductViewWs = async (req, res) => {
  try {
    const products = await Products.find();

    res.render('addProductWithSockets', { products });
  } catch (error) {
    res.render('addProductWithSockets', { products: [] });
  }
};

export default prodCtrl;
