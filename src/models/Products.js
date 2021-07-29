export class Products {
  constructor(products = []) {
    this.products = products;
    this.id = this.products.length;
  }

  getProducts() {
    return this.products;
  }

  addProduct(product) {
    product.id = this.id;
    this.id++;
    this.products.push(product);
    return product;
  }

  getProductById(id) {
    const product = this.products.find((prod) => prod.id === id);
    return product ? product : null;
  }
}
