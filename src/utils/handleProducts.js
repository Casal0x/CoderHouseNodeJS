import fs from 'fs/promises';
import { randomNumber } from './randomNumber';

export const checkIfFileExist = async (path) => {
  try {
    await fs.access(path);
    return false;
  } catch (error) {
    return true;
  }
};

export const createProductsFile = async (numOfProducts = 1, PATH) => {
  const productos = [];
  try {
    for (let i = 0; i < numOfProducts; i++) {
      productos.push({
        id: i,
        title: `Producto numero ${i}`,
        price: 20.44 + randomNumber(0, i + 15),
        thumbnail: 'http://randomimagen.com/asdadas',
      });
    }
    await fs.writeFile(
      PATH,
      JSON.stringify({
        productos,
        visitas: {
          item: 0,
          items: 0,
        },
      })
    );
  } catch (error) {
    console.log('error');
  }
};
