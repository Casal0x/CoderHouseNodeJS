// import 'regenerator-runtime/runtime';

import { FactoryInstance } from '../factory/DAO';
import { ProductTC } from '../models/Products';
import { productControllerFS } from './DAO/products/products.fs';
import { productControlerMongo } from './DAO/products/products.mongo';

export const ProductQuery = {
  productById: ProductTC.getResolver('findById'),
  productList: ProductTC.getResolver('findMany'),
};

export const ProductMutation = {
  productCreateOne: ProductTC.getResolver('createOne'),
};

const DAO = FactoryInstance.getInstance();

export const getController = () => {
  switch (DAO) {
    case 'fs':
      return productControllerFS;
      break;
    case 'mongo-atlas':
    case 'mongo-local':
    default:
      return productControlerMongo;
      break;
  }
};

export const productController = getController();

// class ProductController {
//   async getProducts(req: Request, res: Response) {
//     try {
//       const { id } = req.params;
//       if (id) {
//         const singleProduct = await Products.findById(id);
//         if (!singleProduct) {
//           return res
//             .status(404)
//             .json({ error: 'No existe un producto con este id' });
//         }
//         return res.json({ product: singleProduct });
//       } else {
//         const get = await Products.find();
//         if (get.length === 0) {
//           return res.status(404).json({ error: 'No hay productos cargados' });
//         }
//         return res.json({ products: get });
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       }
//     }
//   }

//   async addProducts(req: Request, res: Response) {
//     try {
//       const body = req.body;
//       if (body) {
//         const newProduct = new Products(body);

//         await newProduct.save();
//         return res.json({ product: newProduct });
//       }
//       return res.status(404).json({
//         error:
//           'Se debe enviar un body con title, description, code, price, thumbnail, stock',
//       });
//     } catch (error) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       }
//     }
//   }

//   async updateProducts(req: Request, res: Response) {
//     try {
//       const { id } = req.params;
//       const body = req.body;
//       await Products.findByIdAndUpdate({ _id: id }, body);
//       const updatedProduct = await Products.findById(id);

//       !updatedProduct
//         ? res.status(404).json({ error: 'Producto no encontrado' })
//         : res.status(201).json({ product: updatedProduct });
//     } catch (error) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       }
//     }
//   }

//   async deleteProducts(req: Request, res: Response) {
//     try {
//       const { id } = req.params;
//       const deletedProduct = await Products.findByIdAndDelete(id);
//       !deletedProduct
//         ? res
//             .status(404)
//             .json({ error: 'Producto no encontrado o ya eliminado' })
//         : res.json({ deletedProduct });
//     } catch (error) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       }
//     }
//   }
// }

// export const productController = new ProductController();
