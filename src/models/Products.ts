class Products {
  products: Array<any>;
  id: number;

  constructor(products = []) {
    this.products = products;
    this.id = this.products.length;
  }

  getProducts() {
    return this.products;
  }

  addProduct(product) {
    product.id = this.id;
    if (product.web) product.web = undefined;
    this.id++;
    this.products.push(product);
    return product;
  }

  getProductById(id: number) {
    const product = this.products.find((prod) => prod.id === id);
    return product ? product : null;
  }

  updateProduct(id: number, data) {
    let product = this.products.find((prod) => prod.id === id);
    if (!product) return null;
    const filteredProducts = this.products.filter((prod) => prod.id !== id);
    product = { ...product, ...data };
    filteredProducts.push(product);
    filteredProducts.sort((a, b) => a.id - b.id);
    this.products = filteredProducts;
    return product;
  }

  removeProduct(id: number) {
    let product = this.products.find((prod) => prod.id === id);
    if (!product) return null;
    this.products = this.products.filter((prod) => prod.id !== id);
    return product;
  }
}

export default Products;
