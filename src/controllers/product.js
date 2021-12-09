import { ProductModel, ProductTC } from '../models/product'

export const ProductQuery = {
  productById: ProductTC.getResolver('findById'),
  productList: ProductTC.getResolver('findMany'),
}

export const ProductMutation = {
  productCreateOne: ProductTC.getResolver('createOne')
}

class Product {
  async listProduct(req, res) {
    res.json({ msg: 'Add Product' })
  }
  async addProduct(req, res) {
    console.log(req.body)
    res.json({ msg: 'OK' })
  }
}

export const ProductController = new Product()
