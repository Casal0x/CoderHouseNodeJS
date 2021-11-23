import axios from 'axios';
import { expect } from 'chai';

describe('Test Productos', () => {
  test('Deberia devolver una logitud mayor a 0 y status 200', async () => {
    const { data, status } = await axios.get(
      'http://localhost:8080/api/productos/listar'
    );

    expect(data.length).to.not.be.equal(0);
    expect(status).to.equal(200);
  });

  test('El producto seleccionado debe tener el codigo A4GSD3442', async () => {
    const idProducto = '6192d53804ee46dd46af1be9';
    const codigoEsperado = 'A4GSD3442';
    const { data } = await axios.get(
      `http://localhost:8080/api/productos/listar/${idProducto}`
    );

    expect(data.product.code).to.equal(codigoEsperado);
  });
});
