import dotenv from "dotenv";

dotenv.config();

export default {
  MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL,
  PORT: process.env.PORT,
  FACEBOOK_ID: process.env.FACEBOOK_ID,
  FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
  GMAIL_USER: process.env.GMAIL_USER,
  GMAIL_PASS: process.env.GMAIL_PASS,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
};
