import Products from '../models/Products';

const prodCtrl = {};
const PRODUCTS = new Products([]);

prodCtrl.getProducts = async (req, res) => {
  try {
    const products = await PRODUCTS.getProducts();

    if (products.length === 0) {
      throw new Error('no hay productos cargados');
    }

    res.json(products);
  } catch (error) {
    res.json({ error: error.message });
  }
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
    const product = PRODUCTS.getProductById(parsedId);
    if (!product) {
      throw new Error('producto no encontrado');
    }

    res.json(product);
  } catch (error) {
    res.json({ error: error.message });
  }
};

prodCtrl.addProduct = async (req, res) => {
  const { body } = req;
  try {
    const isWeb = body.web === 'true' ? true : false;
    const product = await PRODUCTS.addProduct(body);

    if (!product) {
      throw new Error('producto no encontrado');
    }

    if (isWeb) {
      res.render('addProduct');
    } else {
      if (body.ws) {
        const products = await PRODUCTS.getProducts();
        req.io.emit('products', products);
      }
      res.json(product);
    }
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
    const updatedProduct = PRODUCTS.updateProduct(parsedId, body);
    if (!updatedProduct) {
      throw new Error('producto no encontrado');
    }

    res.json(updatedProduct);
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
    const updatedProduct = PRODUCTS.removeProduct(parsedId);
    if (!updatedProduct) {
      throw new Error('producto no encontrado');
    }

    res.json(updatedProduct);
  } catch (error) {
    res.json({ error: error.message });
  }
};

prodCtrl.getView = async (req, res) => {
  let products = await PRODUCTS.getProducts();

  res.render('products', { products });
};

prodCtrl.addProductView = (req, res) => {
  res.render('addProduct');
};

prodCtrl.addProductViewWs = async (req, res) => {
  let products = await PRODUCTS.getProducts();

  res.render('addProductWithSockets', { products });
};

export default prodCtrl;
