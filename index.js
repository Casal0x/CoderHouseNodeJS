const fs = require('fs/promises');
const path = require('path');

const PATH = path.resolve(__dirname, 'productos.txt');

async function leerArchivo() {
  try {
    const file = await fs.readFile(PATH, 'utf-8');
    return JSON.parse(file);
  } catch (error) {
    console.log('El archivo no se encontro');
    return [];
  }
}

async function escribirArchivo(newItems) {
  try {
    let productos = await leerArchivo();
    if (Array.isArray(newItems)) {
      const itemsWithId = newItems.map((item, i) => {
        item.id = productos.length + i;
        return item;
      });
      productos = [...productos, ...itemsWithId];
    } else {
      newItems.id = productos.length;
      productos.push(newItems);
    }
    await fs.writeFile(PATH, JSON.stringify(productos));
    console.log('Escritura finalizada!');
  } catch (error) {
    console.log(error);
  }
}

async function borrarArchivo() {
  try {
    await fs.unlink(PATH);
  } catch (error) {
    console.log('No se pudo borrar el archivo', error);
  }
}

// leerArchivo().then(console.log);

// escribirArchivo({
//   title: 'prueba',
//   price: 23,
//   thumbnail: 'http://imagenrandom.com/asd',
// });

// escribirArchivo([
//   {
//     title: 'prueba 43',
//     price: 222.3,
//     thumbnail: 'http://imagenrandom.com/asd',
//   },
//   {
//     title: 'prueba 23',
//     price: 13.44,
//     thumbnail: 'http://imagenrandom.com/asd',
//   },
// ]);

// borrarArchivo();
