import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { checkIfFileExist, createProductsFile } from './utils/handleProducts';
import { randomNumber } from './utils/randomNumber';

const app = express();
const port = 4000;
const PATH = path.resolve(__dirname, 'productos.txt');

checkIfFileExist(PATH).then((val) => val && createProductsFile(15, PATH));

app.get('/items', async (req, res) => {
  try {
    let data = await fs.readFile(PATH, 'utf8');
    data = JSON.parse(data);
    const productos = data.productos;
    data.visitas.items = data.visitas.items + 1;
    res.json({ productos, cantidad: productos.length });
    await fs.writeFile(PATH, JSON.stringify(data));
  } catch (error) {
    res.json({ error });
  }
});

app.get('/item-random', async (req, res) => {
  try {
    let data = await fs.readFile(PATH, 'utf8');
    data = JSON.parse(data);
    const productos = data.productos;

    data.visitas.item = data.visitas.item + 1;
    const item = productos[randomNumber(0, productos.length - 1)];

    res.json({ item });
    await fs.writeFile(PATH, JSON.stringify(data));
  } catch (error) {
    res.json({ error });
  }
});

app.get('/visitas', async (req, res) => {
  try {
    let data = await fs.readFile(PATH, 'utf8');
    data = JSON.parse(data);

    res.json({ visitas: data.visitas });
  } catch (error) {
    res.json({ error });
  }
});

const server = app.listen(port, () =>
  console.log(`🚀 Server ready at http://localhost:4000`)
);

server.on('error', () => console.log('Error del servidor'));
