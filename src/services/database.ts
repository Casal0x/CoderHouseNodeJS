import mongoose from 'mongoose';
import config from '../config';
import { logger } from '../utils/logger';

export const initDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);

    logger.info('MongoDB is connected');
  } catch (error) {
    logger.error(error);
  }
};
