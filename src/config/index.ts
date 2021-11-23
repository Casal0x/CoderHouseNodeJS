import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || 'dev',
  DB_TYPE: process.env.DB_TYPE || 'mongo-local',
  MONGO_URI: process.env.MONGO_URI || 'http://localhost:27017',
  SECRET: process.env.SECRET || 'SECRET1',
  GMAIL_EMAIL: process.env.GMAIL_EMAIL || 'email@gmail.com',
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD || 'password',
  GMAIL_NAME: process.env.GMAIL_NAME || 'GMAIL owner name',
  TWILIO_ACCOUNT_ID: process.env.TWILIO_ACCOUNT_ID || 'twilioId',
  TWILIO_TOKEN: process.env.TWILIO_TOKEN || 'twilioToken',
  TWILIO_CELLPHONE: process.env.TWILIO_CELLPHONE || '+123456789',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'email@email.com',
  ADMIN_CEL: process.env.ADMIN_CEL || '',
};
