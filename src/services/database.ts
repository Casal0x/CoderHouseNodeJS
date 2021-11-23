// import mongoose from 'mongoose';
import config from '../config';
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server-core';
import { MongoClient } from 'mongodb';
import { logger } from '../utils/logger';

// export const initDB = async () => {
//   try {
//     const connection = await mongoose.connect(config.MONGO_URI);
//     logger.info('MongoDB is connected');
//     return connection;
//   } catch (error) {
//     logger.error(error);
//   }
// };

export interface Global extends NodeJS.Global {
  __MONGOINSTANCE__: MongoMemoryServer;
}

declare const global: Global;

const mongoTestServer = async () => {
  const instance = await MongoMemoryServer.create();
  const uri = instance.getUri();
  global.__MONGOINSTANCE__ = instance;
  return uri.slice(0, uri.lastIndexOf('/'));
};

const getMongoUrl = async (type: string): Promise<string> => {
  if (config.NODE_ENV === 'test') {
    const mongoserver = await mongoTestServer();
    return `${mongoserver}/ecommerce`;
  }
  switch (type) {
    case 'mongo-local':
      return 'mongodb://0.0.0.0:27017/ecommerce';
    default:
      return config.MONGO_URI;
  }
};

export const initDB = async (): Promise<MongoClient> => {
  const mongoUrl = await getMongoUrl(config.DB_TYPE);
  return mongoose.connect(mongoUrl).then((m) => {
    logger.info('Base de datos mongo conectada');
    return m.connection.getClient();
  });
};
