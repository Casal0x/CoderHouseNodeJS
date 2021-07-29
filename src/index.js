import express from 'express';
import { Products } from './models/Products';

const app = express();
const port = 8080;

const PRODUCTS = new Products([]);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/api/productos/listar', async (req, res) => {
  try {
    const products = await PRODUCTS.getProducts();

    if (products.length === 0) {
      throw new Error('no hay productos cargados');
    }

    res.json(products);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get('/api/productos/listar/:id', async (req, res) => {
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
});

app.post('/api/productos/guardar', async (req, res) => {
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
});

const server = app.listen(port, () =>
  console.log(`🚀 Server ready at http://localhost:${port}`)
);

server.on('error', () => console.log('Error del servidor'));
