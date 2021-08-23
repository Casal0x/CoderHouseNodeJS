import { DB_PATH } from '../utils/constants';
import { fileCreation, getDbData, writeDbData } from '../utils/fileCheck';

class Cart {
  id: number = 0;

  constructor() {
    this.getLastID();
  }

  async getLastID() {
    try {
      const data = await getDbData(DB_PATH);
      const lastCartId = data?.carritos[data?.carritos?.length - 1]?.id || 0;
      this.id = lastCartId ? lastCartId + 1 : lastCartId;
    } catch (error) {
      console.error('error ====>', error);
    }
  }

  async getCarts() {
    try {
      const data = await getDbData(DB_PATH);
      return data ? data.carritos : null;
    } catch (error) {
      return null;
    }
  }

  async getCartByID(id: number) {
    try {
      const data = await getDbData(DB_PATH);
      if (data) {
        const cart = data.carritos.find((cart) => cart.id === id);
        return cart || null;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async addProductToCartByIDs(idCart: number, idProduct: number) {
    try {
      const data = await getDbData(DB_PATH);
      if (data) {
        const cart = data.carritos.find((cart) => cart.id === idCart);
        const product = data.productos.find((cart) => cart.id === idProduct);
        const filteredCart = data.carritos.filter((cart) => cart.id === idCart);
        if (product && cart) {
          cart.productos.push(product);
          filteredCart.push(cart);
          data.carritos = filteredCart;
          await writeDbData(DB_PATH, data);
          return cart;
        }
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async deleteCartByID(id: number) {
    try {
      const data = await getDbData(DB_PATH);
      if (data) {
        const cart = data.carritos.find((cart) => cart.id === id);
        const filteredCart = data.carritos.filter((cart) => cart.id === id);
        data.carritos = filteredCart;
        await writeDbData(DB_PATH, data);
        return cart || null;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}

export default Cart;
