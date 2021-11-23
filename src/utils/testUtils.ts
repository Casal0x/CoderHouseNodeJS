import { productosMock } from '../mocks/products';
import ProductosModel from '../models/Products';
import { UserModel } from '../models/User';
import { logger } from './logger';
import { SuperAgentTest } from 'supertest';

export const addProductsMockDb = async (): Promise<void> => {
  await ProductosModel.insertMany(productosMock);
  logger.info('Productos agregados');
};

export let session: string[];

export const addUserAndLogin = async (
  request: SuperAgentTest
): Promise<void> => {
  await UserModel.create({
    email: 'test@test.com',
    password: 'secretPassword',
    repeatPassword: 'secretPassword',
    nombre: 'Test user',
    direccion: 'Test address',
    edad: 31,
    telefono: '+56912345678',
    foto: 'uploads/test-image.jpg',
  });

  await request
    .post('/api/auth/login')
    .send({
      email: 'test@test.com',
      password: 'secretPassword',
    })
    .then((res) => {
      session = res.headers['set-cookie'][0]
        .split(/,(?=\S)/)
        .map((item: string) => item.split(';')[0])
        .join(';');
    });
};
